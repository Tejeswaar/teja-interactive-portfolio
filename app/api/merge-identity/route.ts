import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "../../lib/admin";

/**
 * POST /api/merge-identity
 *
 * Merges a guest visitor row into a logged-in user row.
 * Safe order: update user row → delete guest row (avoids unique constraint conflicts).
 * Called ONCE after GitHub OAuth login (frontend guards with localStorage flag).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitor_id, user_id, github_username, avatar_url, display_name } = body;

    if (!visitor_id || !user_id) {
      return NextResponse.json(
        { error: "Both visitor_id and user_id are required." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Find guest row
    const { data: guestRow } = await supabase
      .from("visitors")
      .select("id, clicks, active_seconds, display_name, game_score, achievement_score, achievements")
      .eq("visitor_id", visitor_id)
      .is("user_id", null)
      .single();

    // Find existing user row
    const { data: userRow } = await supabase
      .from("visitors")
      .select("id, clicks, active_seconds, game_score, achievement_score, achievements")
      .eq("user_id", user_id)
      .single();

    if (guestRow && userRow) {
      // Both exist → user already has an account. Do NOT merge or delete.
      // The guest row may belong to someone else (e.g. friend's computer).

      // Update metadata on the existing user row (avatar, username, etc.)
      const updateData: Record<string, unknown> = {
        github_username: github_username || null,
        avatar_url: avatar_url || null,
        last_seen: new Date().toISOString(),
      };
      if (github_username) {
        updateData.display_name = github_username;
      }
      await supabase
        .from("visitors")
        .update(updateData)
        .eq("id", userRow.id);

      return NextResponse.json({
        success: true,
        action: "already_exists",
        clicks: userRow.clicks,
        active_seconds: userRow.active_seconds,
      });
    } else if (guestRow && !userRow) {
      // Only guest exists → upgrade it to a user row
      const { error: upgradeErr } = await supabase
        .from("visitors")
        .update({
          user_id,
          github_username: github_username || null,
          avatar_url: avatar_url || null,
          display_name: github_username || guestRow.display_name,
          last_seen: new Date().toISOString(),
        })
        .eq("id", guestRow.id);

      if (upgradeErr) {
        return NextResponse.json(
          { error: "Failed to upgrade: " + upgradeErr.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        action: "upgraded",
        clicks: guestRow.clicks,
        active_seconds: guestRow.active_seconds,
      });
    } else if (!guestRow && !userRow) {
      // Neither exists → create a new user row
      const { error: createErr } = await supabase.from("visitors").insert({
        user_id,
        display_name: github_username || "User",
        github_username: github_username || null,
        avatar_url: avatar_url || null,
        clicks: 0,
        active_seconds: 0,
      });

      if (createErr) {
        return NextResponse.json(
          { error: "Failed to create: " + createErr.message },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, action: "created" });
    } else {
      // Only user exists → no merge needed
      // Update GitHub metadata and display_name in case it changed
      const updateData: Record<string, unknown> = {
        github_username: github_username || null,
        avatar_url: avatar_url || null,
        last_seen: new Date().toISOString(),
      };
      if (github_username) {
        updateData.display_name = github_username;
      } else if (display_name) {
        updateData.display_name = display_name;
      }
      await supabase
        .from("visitors")
        .update(updateData)
        .eq("user_id", user_id);

      return NextResponse.json({ success: true, action: "already_exists" });
    }
  } catch {
    return NextResponse.json(
      { error: "Merge failed." },
      { status: 500 }
    );
  }
}
