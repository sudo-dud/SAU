import React from 'react';
import { CURRENT_ISSUE } from '../data/editorialData';

interface FooterProps {
  onNavigate: (tab: 'broadsheet' | 'reader' | 'activities' | 'archives' | 'submissions') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F1F3FF]/50 text-[#43474E] text-xs py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Imprint (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <span className="font-editorial text-2xl font-bold text-[#002045] block">
              The Quill & Folio
            </span>
            <p className="text-xs text-[#43474E] max-w-sm leading-relaxed">
              Published quarterly under the auspices of the Faculty Board of English Language & Literature and the Student Activities Unit. Dedicated to critical rigor, archival scholarship, and modern poetics.
            </p>
            <div className="text-[11px] font-serif italic text-[#7D5700]">
              "{CURRENT_ISSUE.mottoLatin}" — {CURRENT_ISSUE.mottoEnglish}
            </div>
          </div>

          {/* Quick Nav (2 cols) */}
          <div className="md:col-span-2 space-y-2">
            <div className="font-bold text-[#1A365D] uppercase text-[11px] tracking-wider">
              Publications
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('broadsheet')}
                  className="hover:text-[#002045] hover:underline cursor-pointer"
                >
                  Current Broadside
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reader')}
                  className="hover:text-[#002045] hover:underline cursor-pointer"
                >
                  Monograph Review
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('archives')}
                  className="hover:text-[#002045] hover:underline cursor-pointer"
                >
                  Archival Register
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('submissions')}
                  className="hover:text-[#002045] hover:underline cursor-pointer"
                >
                  Call for Papers
                </button>
              </li>
            </ul>
          </div>

          {/* Student Activities (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-bold text-[#1A365D] uppercase text-[11px] tracking-wider">
              Student Activities
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('activities')}
                  className="hover:text-[#002045] hover:underline cursor-pointer"
                >
                  Collegiate Dialectic Union
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('activities')}
                  className="hover:text-[#002045] hover:underline cursor-pointer"
                >
                  Inklings Poetry Workshop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('activities')}
                  className="hover:text-[#002045] hover:underline cursor-pointer"
                >
                  Elizabethan & Jacobean Players
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('activities')}
                  className="hover:text-[#002045] hover:underline cursor-pointer"
                >
                  Undergraduate Review Board
                </button>
              </li>
            </ul>
          </div>

          {/* Department Contact (2 cols) */}
          <div className="md:col-span-2 space-y-2">
            <div className="font-bold text-[#1A365D] uppercase text-[11px] tracking-wider">
              Faculty Office
            </div>
            <div className="text-xs text-[#43474E] space-y-1">
              <div>St. Cross Building</div>
              <div>University Road</div>
              <div className="pt-2 font-mono text-[11px] text-[#74777F]">{CURRENT_ISSUE.issn}</div>
            </div>
          </div>
        </div>

        {/* Hairline divider & bottom note */}
        <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#74777F]">
          <div>
            © {new Date().getFullYear()} Faculty of English Language & Literature. All scholarly rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Editor-in-Chief: {CURRENT_ISSUE.editorInChief}</span>
            <span>·</span>
            <span>Open Academic Commons</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
