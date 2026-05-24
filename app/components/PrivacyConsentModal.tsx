import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function PrivacyConsentModal({ isOpen, onAccept, onDecline }: Props) {
  const [readAll, setReadAll] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-6 shadow-2xl max-w-md w-full font-mono">
        <h2 className="text-xl font-bold text-[var(--accent)] mb-4">Before you continue...</h2>
        
        <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
          To log you in via GitHub and save your achievements to the global leaderboard, 
          we need to store basic profile data (your display name and avatar) and use 
          secure cookies for authentication.
        </p>

        <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
          Please review our <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Privacy Policy</a> to understand how your data is handled.
        </p>

        <label className="flex items-start gap-3 cursor-pointer mb-6 group">
          <div className="relative flex items-center justify-center w-5 h-5 mt-0.5 border border-[var(--border)] rounded bg-[var(--bg-primary)] group-hover:border-[var(--accent)] transition-colors">
            <input 
              type="checkbox" 
              className="absolute opacity-0 w-full h-full cursor-pointer"
              checked={readAll}
              onChange={(e) => setReadAll(e.target.checked)}
            />
            {readAll && (
              <svg className="w-3 h-3 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm select-none">
            I have read the Privacy Policy and accept the terms to continue logging in.
          </span>
        </label>

        <div className="flex gap-3 justify-end">
          <button 
            onClick={onDecline}
            className="px-4 py-2 text-sm font-medium hover:bg-[var(--bg-primary)] transition-colors rounded"
          >
            Cancel
          </button>
          <button 
            onClick={onAccept}
            disabled={!readAll}
            className="px-4 py-2 text-sm font-bold bg-[var(--accent)] text-black rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Accept & Login
          </button>
        </div>
      </div>
    </div>
  );
}
