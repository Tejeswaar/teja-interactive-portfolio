import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Tejeswaar Reddy's interactive portfolio.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-mono p-8 md:p-16">
      <div className="max-w-3xl mx-auto space-y-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-[var(--accent)]">
          Privacy Policy
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <section className="space-y-4 mt-8">
          <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2">
            1. Information Collection
          </h2>
          <p>
            This portfolio utilizes gamified elements, interactive terminal commands, and a global leaderboard system. To facilitate these features, we collect the following data:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Guest Data (No Login):</strong> An anonymous &quot;visitor ID&quot; is generated and stored locally in your browser to track non-identifying metrics (like clicks, easter egg discovery, and time active).
            </li>
            <li>
              <strong>OAuth Data (GitHub Login):</strong> If you choose to log in via GitHub to save your progress on the leaderboard, we securely retrieve your basic public profile information: your GitHub display name, avatar URL, and user ID. We do not access your private repositories or sensitive account data.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2">
            2. How Information is Used
          </h2>
          <p>The collected information is used strictly to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Display your chosen name and avatar on the public leaderboard.</li>
            <li>Persist your progress, scores, and unlocked achievements across sessions.</li>
            <li>Monitor generic site engagement (which terminal commands are used, games played).</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2">
            3. Local Storage and Cookies
          </h2>
          <p>
            This website relies on your browser&apos;s <code>localStorage</code> to maintain theme preferences, terminal history, and your anonymous visitor ID. By using the site, you consent to the storage of these functional preferences. Third-party cookies may be used by Supabase (our backend provider) to maintain secure authentication sessions if you choose to log in.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2">
            4. Data Sharing
          </h2>
          <p>
            Your data is <strong>never</strong> sold, rented, or shared with third-party marketers. Leaderboard data (Display Name, Score, Avatar) is public by design.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-[var(--border)] pb-2">
            5. Contact
          </h2>
          <p>
            If you have questions about this policy or wish to have your leaderboard data removed, please contact me at:{" "}
            <a href="mailto:tejeswaarreddy@gmail.com" className="text-[var(--accent)] hover:underline">
              tejeswaarreddy@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
