import React from 'react';
import { Bookmark, Menu, X, Feather } from 'lucide-react';
import { CURRENT_ISSUE } from '../data/editorialData';

export type ActiveTab = 'broadsheet' | 'reader' | 'activities' | 'archives' | 'submissions';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  savedCount: number;
  onOpenFolio: () => void;
  onOpenSubmissionModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  savedCount,
  onOpenFolio,
  onOpenSubmissionModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-[#E2E8F0] bg-[#FBFBFA] sticky top-0 z-40 transition-all">
      {/* Editorial Scholarly Super-Header */}
      <div className="border-b border-[#E2E8F0] bg-[#F1F3FF]/40 text-[#43474E] text-[11px] font-sans">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wider text-[#1A365D] uppercase">
              University Department of English Language & Literature
            </span>
            <span className="hidden sm:inline text-[#C4C6CF]">|</span>
            <span className="hidden sm:inline italic text-[#7D5700] font-serif">
              "{CURRENT_ISSUE.mottoLatin}" — {CURRENT_ISSUE.mottoEnglish}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="font-medium text-[#161C27]">{CURRENT_ISSUE.term}</span>
            <span className="text-[#C4C6CF]">·</span>
            <span>{CURRENT_ISSUE.volume}, {CURRENT_ISSUE.number}</span>
            <span className="text-[#C4C6CF]">·</span>
            <span className="hidden md:inline font-mono text-[10px] text-[#74777F]">{CURRENT_ISSUE.issn}</span>
          </div>
        </div>
      </div>

      {/* Primary Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Action) */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in Playfair Display) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('broadsheet')}
            className="text-left group flex items-baseline gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1A365D]"
          >
            <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#002045] group-hover:text-[#1A365D] transition-colors whitespace-nowrap">
              The Quill & Folio
            </span>
            <span className="hidden lg:inline text-xs font-serif italic text-[#7D5700]">
              Gazette & Review
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 Nav Links (Single line text with hover underline) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#43474E]">
          <button
            onClick={() => handleNavClick('broadsheet')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer relative ${
              activeTab === 'broadsheet'
                ? 'text-[#002045] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1A365D]'
                : 'hover:text-[#002045]'
            }`}
          >
            Broadside
          </button>

          <button
            onClick={() => handleNavClick('reader')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer relative ${
              activeTab === 'reader'
                ? 'text-[#002045] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1A365D]'
                : 'hover:text-[#002045]'
            }`}
          >
            Literary Review
          </button>

          <button
            onClick={() => handleNavClick('activities')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer relative ${
              activeTab === 'activities'
                ? 'text-[#002045] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1A365D]'
                : 'hover:text-[#002045]'
            }`}
          >
            Student Activities
          </button>

          <button
            onClick={() => handleNavClick('archives')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer relative ${
              activeTab === 'archives'
                ? 'text-[#002045] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1A365D]'
                : 'hover:text-[#002045]'
            }`}
          >
            Curated Archives
          </button>

          <button
            onClick={() => handleNavClick('submissions')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer relative ${
              activeTab === 'submissions'
                ? 'text-[#002045] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1A365D]'
                : 'hover:text-[#002045]'
            }`}
          >
            Call for Papers
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Research Folio / Submit) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenFolio}
            title="Open Research Folio"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1A365D] border border-[#CBD5E1] rounded hover:bg-[#F1F3FF] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A365D]"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#D69E2E]" />
            <span className="hidden sm:inline">Research Folio</span>
            {savedCount > 0 && (
              <span className="bg-[#1A365D] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenSubmissionModal}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1A365D] hover:bg-[#2B6CB0] rounded transition-colors whitespace-nowrap cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A365D]"
          >
            <Feather className="w-3.5 h-3.5 text-[#D69E2E]" />
            <span>Submit Manuscript</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#161C27] hover:bg-[#E2E8F0]/50 rounded cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-[#FFFFFF] px-6 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <button
              onClick={() => handleNavClick('broadsheet')}
              className={`text-left py-2 px-3 rounded ${
                activeTab === 'broadsheet' ? 'bg-[#F1F3FF] text-[#002045] font-semibold' : 'text-[#43474E]'
              }`}
            >
              Broadside (Front Page)
            </button>
            <button
              onClick={() => handleNavClick('reader')}
              className={`text-left py-2 px-3 rounded ${
                activeTab === 'reader' ? 'bg-[#F1F3FF] text-[#002045] font-semibold' : 'text-[#43474E]'
              }`}
            >
              Literary Review & Essays
            </button>
            <button
              onClick={() => handleNavClick('activities')}
              className={`text-left py-2 px-3 rounded ${
                activeTab === 'activities' ? 'bg-[#F1F3FF] text-[#002045] font-semibold' : 'text-[#43474E]'
              }`}
            >
              Student Activities & Societies
            </button>
            <button
              onClick={() => handleNavClick('archives')}
              className={`text-left py-2 px-3 rounded ${
                activeTab === 'archives' ? 'bg-[#F1F3FF] text-[#002045] font-semibold' : 'text-[#43474E]'
              }`}
            >
              Curated Archival Index
            </button>
            <button
              onClick={() => handleNavClick('submissions')}
              className={`text-left py-2 px-3 rounded ${
                activeTab === 'submissions' ? 'bg-[#F1F3FF] text-[#002045] font-semibold' : 'text-[#43474E]'
              }`}
            >
              Call for Papers & Submissions
            </button>
          </div>

          <div className="pt-2 border-t border-[#E2E8F0]">
            <button
              onClick={() => {
                onOpenSubmissionModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#1A365D] rounded"
            >
              <Feather className="w-4 h-4 text-[#D69E2E]" />
              <span>Submit Manuscript Online</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
