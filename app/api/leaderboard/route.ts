import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, generateDisplayName } from "../../lib/admin";

/**
 * Resolve the visitor row based on identity priority: user_id > visitor_id.
 */
function resolveIdentity(body: { visitor_id?: string; user_id?: string }): {
  column: string;
  value: string;
} | null {
  if (body.user_id) return { column: "user_id", value: body.user_id };
  if (body.visitor_id) return { column: "visitor_id", value: body.visitor_id };
  return null;
}

// GET — scalable leaderboard: top 10 + user context window
export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const userId = req.nextUrl.searchParams.get("user_id");
    const visitorId = req.nextUrl.searchParams.get("visitor_id");

    const fields =
      "user_id, visitor_id, display_name, clicks, active_seconds, game_score, achievement_score, score, last_seen, avatar_url, github_username, achievements";

    // 1. Always fetch top 10
    const { data: top10, error: topErr } = await supabase
      .from("visitors")
      .select(fields)
      .order("score", { ascending: false })
      .limit(10);

    if (topErr) {
      return NextResponse.json({ error: topErr.message }, { status: 500 });
    }

    // 2. Get total player count
    const { count: totalPlayers } = await supabase
      .from("visitors")
      .select("id", { count: "exact", head: true });

    // 3. If a user identity is provided, find their rank + context window
    let userRank: number | null = null;
    let userContext: (typeof top10[0] & { rank: number })[] = [];

    // Determine which identity to look up
    const lookupColumn = userId ? "user_id" : visitorId ? "visitor_id" : null;
    const lookupValue = userId || visitorId;

    if (lookupColumn && lookupValue) {
      // Find the user's row
      const { data: userRow } = await supabase
        .from("visitors")
        .select("id, score")
        .eq(lookupColumn, lookupValue)
        .single();

      if (userRow && userRow.score != null) {
        // Count how many players have a strictly higher score → rank = count + 1
        const { count: higherCount } = await supabase
          .from("visitors")
          .select("id", { count: "exact", head: true })
          .gt("score", userRow.score);

        userRank = (higherCount ?? 0) + 1;

        // Only fetch context if user is NOT in top 10
        if (userRank > 10) {
          const contextRadius = 25;
          // We need ranks (userRank - 25) to (userRank + 25)
          // But skip anything already in top 10
          const contextStart = Math.max(userRank - contextRadius, 11); // never overlap with top 10
          const contextEnd = userRank + contextRadius;

          // offset is 0-indexed, contextStart is 1-indexed rank
          const offset = contextStart - 1;
          const limit = contextEnd - contextStart + 1;

          const { data: contextData } = await supabase
            .from("visitors")
            .select(fields)
            .order("score", { ascending: false })
            .range(offset, offset + limit - 1);

          if (contextData) {
            userContext = contextData.map((entry, i) => ({
              ...entry,
              rank: contextStart + i,
            }));
          }
        }
      }
    }

    // Attach ranks to top 10
    const top10WithRanks = (top10 || []).map((entry, i) => ({
      ...entry,
      rank: i + 1,
    }));

    return NextResponse.json({
      top10: top10WithRanks,
      userContext,
      userRank,
      totalPlayers: totalPlayers ?? 0,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch leaderboard." },
      { status: 500 }
    );
  }
}

// POST — update visitor activity (upsert)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clicks = 0,
      active_seconds = 0,
      game_score = 0,
      achievement_score = 0,
      display_name,
      achievement,
      theme,
    } = body;

    const identity = resolveIdentity(body);
    if (!identity) {
      return NextResponse.json(
        { error: "visitor_id or user_id required." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Check if visitor exists
    const { data: existing } = await supabase
      .from("visitors")
      .select("id, clicks, active_seconds, game_score, achievement_score, display_name, achievements")
      .eq(identity.column, identity.value)
      .single();

    if (existing) {
      // Update existing row
      const previousAchievements = existing.achievements || [];
      const updatedAchievements = [...previousAchievements];
      
      let earnedAchievementScore = 0;
      if (achievement && !updatedAchievements.includes(achievement)) {
        updatedAchievements.push(achievement);
        earnedAchievementScore = achievement_score; // Only grant points once
      }

      const updates: Record<string, unknown> = {
        clicks: existing.clicks + clicks,
        active_seconds: existing.active_seconds + active_seconds,
        game_score: (existing.game_score || 0) + game_score,
        achievement_score: (existing.achievement_score || 0) + earnedAchievementScore,
        last_seen: new Date().toISOString(),
        achievements: updatedAchievements,
      };
      if (display_name && display_name !== existing.display_name) {
        updates.display_name = display_name;
      }
      if (theme) {
        updates.theme = theme;
      }

      const { error } = await supabase
        .from("visitors")
        .update(updates)
        .eq("id", existing.id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({
        success: true,
        display_name: display_name || existing.display_name,
        totalClicks: existing.clicks + clicks,
        totalSeconds: existing.active_seconds + active_seconds,
        totalGameScore: (existing.game_score || 0) + game_score,
      });
    } else {
      // No existing row — only create if user earned points via game or achievement.
      // Passive clicks/time alone should NOT create a leaderboard entry.
      const hasGameActivity = game_score > 0 || achievement_score > 0;

      if (!hasGameActivity && identity.column !== "user_id") {
        // Guest with no game activity → silently ignore, don't create a row
        return NextResponse.json({
          success: true,
          action: "skipped",
          display_name: display_name || null,
        });
      }

      // Create new visitor row via insert
      const name = display_name || generateDisplayName();
      const newRow: Record<string, unknown> = {
        [identity.column]: identity.value,
        clicks,
        active_seconds,
        game_score,
        achievement_score,
        display_name: name,
        achievements: achievement ? [achievement] : [],
      };
      
      if (theme) {
        newRow.theme = theme;
      }

      const { error } = await supabase.from("visitors").insert(newRow);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({
        success: true,
        display_name: name,
        totalClicks: clicks,
        totalSeconds: active_seconds,
        totalGameScore: game_score,
        totalAchievementScore: achievement_score,
        achievements: newRow.achievements,
      });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to update activity." },
      { status: 500 }
    );
  }
}
