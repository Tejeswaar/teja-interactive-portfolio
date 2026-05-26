import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "../../lib/admin";

/**
 * POST /api/admin-cleanup
 *
 * Deletes stale guest accounts (no user_id) that are:
 * - Below rank 100 (by score)
 * - Last seen more than 1 month ago
 *
 * Auth: admin session cookie OR Vercel cron secret (for automated runs).
 * Runs automatically once a week via Vercel Cron.
 */
export async function POST(req: NextRequest) {
  try {
    // Auth: either admin cookie or cron secret
    const sessionCookie = req.cookies.get("admin_session")?.value;
    const cronSecret = req.headers.get("authorization");
    const isAuthorized =
      sessionCookie ||
      (process.env.CRON_SECRET && cronSecret === `Bearer ${process.env.CRON_SECRET}`);

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createAdminClient();

    // Find the score threshold for rank 100
    const { data: topRows } = await supabase
      .from("visitors")
      .select("score")
      .order("score", { ascending: false })
      .range(99, 99); // 0-indexed, so index 99 = rank 100

    const rank100Score = topRows?.[0]?.score ?? 0;

    // Calculate 1 month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Delete guest rows that are below rank 100 AND stale (last seen > 1 month ago)
    const { data: deleted, error } = await supabase
      .from("visitors")
      .delete()
      .is("user_id", null) // only guest accounts
      .lt("score", rank100Score) // below rank 100
      .lt("last_seen", oneMonthAgo.toISOString()) // not seen in 1+ month
      .select("id"); // return deleted rows for count

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      deleted: deleted?.length ?? 0,
      threshold: {
        rank100Score,
        cutoffDate: oneMonthAgo.toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Cleanup failed." },
      { status: 500 }
    );
  }
}
