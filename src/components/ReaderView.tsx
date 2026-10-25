import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Bookmark,
  Share2,
  Copy,
  Check,
  Type,
  FileText,
  Quote,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Info,
} from 'lucide-react';
import { Article, ARTICLES } from '../data/editorialData';
import { SafeImage } from './SafeImage';

interface ReaderViewProps {
  currentArticle: Article;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  onBackToBroadsheet: () => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  currentArticle,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  onBackToBroadsheet,
}) => {
  // Reading preferences
  const [fontSize, setFontSize] = useState<'base' | 'lg' | 'xl'>('lg');
  const [readingTheme, setReadingTheme] = useState<'parchment' | 'pure' | 'night'>('parchment');
  const [citationFormat, setCitationFormat] = useState<'mla' | 'chicago' | 'apa'>('mla');
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [activeMarginNote, setActiveMarginNote] = useState<string | null>(null);

  // Audio player state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(38); // percent
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5>(1);

  // Audio simulation timer
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, playbackSpeed]);

  const handleCopyCitation = () => {
    const text = currentArticle.citations[citationFormat];
    navigator.clipboard?.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const currentIndex = ARTICLES.findIndex((a) => a.id === currentArticle.id);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  // Theme styles
  const themeClasses = {
    parchment: 'bg-[#FBFBFA] text-[#161C27]',
    pure: 'bg-[#FFFFFF] text-[#1A202C]',
    night: 'bg-[#161C27] text-[#ECF0FF]',
  }[readingTheme];

  const cardThemeClasses = {
    parchment: 'bg-[#FFFFFF] border-[#E2E8F0]',
    pure: 'bg-[#F8FAFC] border-[#E2E8F0]',
    night: 'bg-[#1E2533] border-[#2A303D] text-[#ECF0FF]',
  }[readingTheme];

  const fontSizeClasses = {
    base: 'text-base leading-[1.75]',
    lg: 'text-lg leading-[1.85]',
    xl: 'text-xl leading-[1.95]',
  }[fontSize];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${themeClasses} pb-20`}>
      {/* READER UTILITY TOOLBAR */}
      <div className="sticky top-[89px] z-30 border-b border-[#E2E8F0] backdrop-blur-md bg-opacity-95 bg-inherit px-4 sm:px-6 py-2.5">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left: Article Switcher & Back */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToBroadsheet}
              className="flex items-center gap-1 text-xs font-semibold text-[#1A365D] hover:text-[#2B6CB0] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Broadsheet</span>
            </button>
            <span className="text-[#C4C6CF]">|</span>
            {/* Quick Article Dropdown */}
            <select
              value={currentArticle.id}
              onChange={(e) => {
                const found = ARTICLES.find((a) => a.id === e.target.value);
                if (found) onSelectArticle(found);
              }}
              className="text-xs font-serif bg-transparent border-0 text-[#161C27] font-semibold cursor-pointer max-w-[240px] sm:max-w-[340px] truncate focus:outline-none"
            >
              {ARTICLES.map((art) => (
                <option key={art.id} value={art.id} className="text-[#161C27] bg-white">
                  {art.title}
                </option>
              ))}
            </select>
          </div>

          {/* Right: Controls (Font, Theme, Bookmark, Audio) */}
          <div className="flex items-center gap-3 text-xs">
            {/* Font Size Toggle */}
            <div className="hidden sm:flex items-center gap-1 border border-[#CBD5E1] rounded px-1.5 py-0.5">
              <Type className="w-3 h-3 text-[#74777F] mr-0.5" />
              <button
                onClick={() => setFontSize('base')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium cursor-pointer ${
                  fontSize === 'base' ? 'bg-[#1A365D] text-white' : 'text-[#43474E]'
                }`}
              >
                16
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium cursor-pointer ${
                  fontSize === 'lg' ? 'bg-[#1A365D] text-white' : 'text-[#43474E]'
                }`}
              >
                18
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium cursor-pointer ${
                  fontSize === 'xl' ? 'bg-[#1A365D] text-white' : 'text-[#43474E]'
                }`}
              >
                20
              </button>
            </div>

            {/* Theme Toggle */}
            <div className="hidden sm:flex items-center gap-1 border border-[#CBD5E1] rounded px-1.5 py-0.5 text-[11px]">
              <button
                onClick={() => setReadingTheme('parchment')}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                  readingTheme === 'parchment' ? 'bg-[#FEFCF6] font-bold text-[#7D5700]' : 'text-[#74777F]'
                }`}
              >
                Parchment
              </button>
              <button
                onClick={() => setReadingTheme('pure')}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                  readingTheme === 'pure' ? 'bg-white font-bold text-[#1A365D]' : 'text-[#74777F]'
                }`}
              >
                Pure
              </button>
              <button
                onClick={() => setReadingTheme('night')}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                  readingTheme === 'night' ? 'bg-[#161C27] font-bold text-[#ADC7F7]' : 'text-[#74777F]'
                }`}
              >
                Night
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(currentArticle.id)}
              className={`p-1.5 rounded border border-[#CBD5E1] flex items-center gap-1 cursor-pointer transition-colors ${
                isBookmarked(currentArticle.id) ? 'bg-[#FEFCF6] text-[#D69E2E] border-[#D69E2E]' : 'text-[#43474E]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span className="hidden md:inline">Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* AUDIO NARRATION COMPONENT STRIP */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-6">
        <div className="border border-[#CBD5E1] rounded p-3.5 bg-[#FFFFFF] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              aria-label={isPlayingAudio ? 'Pause narration' : 'Play narration'}
              className="w-9 h-9 rounded-full bg-[#1A365D] hover:bg-[#2B6CB0] text-white flex items-center justify-center cursor-pointer shrink-0 transition-colors"
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <div>
              <div className="text-xs font-semibold text-[#161C27] flex items-center gap-2">
                <span>Faculty Audio Narration</span>
                <span className="text-[10px] text-[#7D5700] bg-[#FEFCF6] border border-[#D69E2E]/40 px-1.5 py-0.2 rounded font-sans uppercase font-bold">
                  High Fidelity
                </span>
              </div>
              <div className="text-[11px] text-[#74777F] font-mono">
                {isPlayingAudio ? 'Speaking: Act I Section' : 'Narrated by Oxford Faculty Voice Archive'}
              </div>
            </div>
          </div>

          {/* Scrubber simulation */}
          <div className="flex-1 max-w-xl w-full flex items-center gap-3">
            <span className="text-[10px] font-mono text-[#74777F]">04:12</span>
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setAudioProgress(Math.round(pos * 100));
              }}
              className="flex-1 h-2 bg-[#E2E8F0] rounded-full cursor-pointer relative overflow-hidden"
            >
              <div
                className="h-full bg-[#1A365D] rounded-full transition-all duration-300"
                style={{ width: `${audioProgress}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-mono text-[#74777F]">14:28</span>
          </div>

          {/* Speed & Narration Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (playbackSpeed === 1) setPlaybackSpeed(1.25);
                else if (playbackSpeed === 1.25) setPlaybackSpeed(1.5);
                else setPlaybackSpeed(1);
              }}
              className="text-[11px] font-mono font-semibold px-2 py-1 border border-[#CBD5E1] rounded hover:bg-[#F1F3FF] cursor-pointer"
            >
              {playbackSpeed}x
            </button>
          </div>
        </div>
      </div>

      {/* ASYMMETRICAL 12-COLUMN READING LAYOUT (8 Cols Reading Well + 4 Cols Contextual Margin Rail) */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* ARTICLE READING WELL (8 Columns, max-w-prose constraint for readability) */}
          <article className="lg:col-span-8 space-y-8">
            {/* Header Lockup */}
            <header className="space-y-4 border-b border-[#CBD5E1] pb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold tracking-[0.12em] text-[#D69E2E] uppercase">
                  {currentArticle.kicker}
                </span>
                <span className="text-[#CBD5E1]">·</span>
                <span className="text-[#74777F]">{currentArticle.volume}, {currentArticle.issue}</span>
                <span className="text-[#CBD5E1]">·</span>
                <span className="font-mono text-[11px] text-[#74777F]">DOI: {currentArticle.doi}</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] text-[#002045]">
                {currentArticle.title}
              </h1>

              <p className="font-serif italic text-xl text-[#2B6CB0] leading-snug">
                {currentArticle.subtitle}
              </p>

              {/* Author Attribution Strip */}
              <div className="pt-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-[#CBD5E1]">
                    <SafeImage
                      src={currentArticle.author.avatar}
                      alt={currentArticle.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#161C27]">
                      {currentArticle.author.name}
                    </div>
                    <div className="text-[#74777F]">{currentArticle.author.role}</div>
                  </div>
                </div>

                <div className="text-right text-[#74777F] text-xs">
                  <div>Published {currentArticle.date}</div>
                  <div>Estimated reading: <span className="tabular-nums font-semibold">{currentArticle.readTime}</span></div>
                </div>
              </div>
            </header>

            {/* Abstract Box */}
            <div className={`p-5 rounded border ${cardThemeClasses} space-y-2`}>
              <div className="text-[11px] font-bold tracking-[0.12em] text-[#1A365D] uppercase">
                Scholarly Abstract
              </div>
              <p className="text-sm italic leading-relaxed text-[#43474E]">
                {currentArticle.abstract}
              </p>
            </div>

            {/* Feature Image */}
            <div className="space-y-2">
              <div className="rounded border border-[#CBD5E1] overflow-hidden aspect-[16/9] bg-[#F1F3FF]">
                <SafeImage
                  src={currentArticle.coverImage}
                  alt={currentArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-serif italic text-[#74777F] text-center">
                {currentArticle.coverCaption}
              </p>
            </div>

            {/* BODY TEXT PROSE WITH DROP CAP AND CLASSICAL PACING */}
            <div className={`font-sans ${fontSizeClasses} space-y-6 text-[#161C27]`}>
              {/* Lead paragraph with classic drop cap */}
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#002045] first-letter:leading-none">
                {currentArticle.leadParagraph}
              </p>

              {/* Body Sections */}
              {currentArticle.bodySections.map((section, sIdx) => (
                <section key={sIdx} className="space-y-5 pt-4">
                  {section.heading && (
                    <h2 className="font-editorial text-2xl font-bold text-[#002045] pt-4 border-t border-[#E2E8F0]">
                      {section.heading}
                    </h2>
                  )}

                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {/* Pull Quote with Vertical 3px Left Border in Warm Amber Gold */}
                  {section.pullQuote && (
                    <div className="my-8 pl-6 border-l-[3px] border-[#D69E2E] py-2 bg-[#FEFCF6]/60">
                      <blockquote className="font-editorial italic text-xl sm:text-2xl text-[#1A202C] leading-snug">
                        "{section.pullQuote}"
                      </blockquote>
                      {section.pullQuoteAttribution && (
                        <cite className="block mt-2 text-xs font-sans not-italic text-[#7D5700] font-semibold tracking-wider uppercase">
                          — {section.pullQuoteAttribution}
                        </cite>
                      )}
                    </div>
                  )}

                  {/* Inline Margin Note trigger on mobile/inline */}
                  {section.marginNote && (
                    <div className="lg:hidden p-3 bg-[#F1F3FF] border border-[#CBD5E1] rounded text-xs text-[#1A365D]">
                      <span className="font-bold text-[#D69E2E]">✦ {section.marginNote.label}: </span>
                      <span>{section.marginNote.text}</span>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* ARTICLE TAGS & TAXONOMY */}
            <div className="pt-8 border-t border-[#CBD5E1] space-y-3">
              <div className="text-xs font-bold text-[#74777F] uppercase tracking-wider">
                Indexation & Subject Categories:
              </div>
              <div className="flex flex-wrap gap-2">
                {currentArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 bg-[#F1F5F9] text-[#161C27] rounded border border-[#E2E8F0]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* PREVIOUS / NEXT ARTICLE FOOTER NAVIGATION */}
            <div className="pt-8 border-t border-[#CBD5E1] grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <button
                  onClick={() => onSelectArticle(prevArticle)}
                  className="p-4 rounded border border-[#E2E8F0] hover:border-[#1A365D] bg-[#FFFFFF] text-left transition-all cursor-pointer group"
                >
                  <div className="text-[10px] font-bold tracking-wider text-[#7D5700] uppercase mb-1 flex items-center gap-1">
                    <ChevronLeft className="w-3 h-3" />
                    <span>Previous Monograph</span>
                  </div>
                  <div className="font-editorial font-bold text-sm text-[#002045] group-hover:text-[#1A365D] line-clamp-1">
                    {prevArticle.title}
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextArticle && (
                <button
                  onClick={() => onSelectArticle(nextArticle)}
                  className="p-4 rounded border border-[#E2E8F0] hover:border-[#1A365D] bg-[#FFFFFF] text-right transition-all cursor-pointer group"
                >
                  <div className="text-[10px] font-bold tracking-wider text-[#7D5700] uppercase mb-1 flex items-center justify-end gap-1">
                    <span>Next Monograph</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                  <div className="font-editorial font-bold text-sm text-[#002045] group-hover:text-[#1A365D] line-clamp-1">
                    {nextArticle.title}
                  </div>
                </button>
              )}
            </div>
          </article>

          {/* CONTEXTUAL SIDEBAR (4 Columns: Citations, Margin Notes, Author Dossier) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Author Dossier Card */}
            <div className={`p-5 rounded border ${cardThemeClasses} space-y-3`}>
              <div className="text-[11px] font-bold tracking-[0.12em] text-[#D69E2E] uppercase">
                Author Fellow Dossier
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#CBD5E1] shrink-0">
                  <SafeImage
                    src={currentArticle.author.avatar}
                    alt={currentArticle.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-editorial font-bold text-base text-[#002045]">
                    {currentArticle.author.name}
                  </h3>
                  <div className="text-xs text-[#74777F]">{currentArticle.author.institution}</div>
                </div>
              </div>

              <p className="text-xs text-[#43474E] leading-relaxed">
                {currentArticle.author.bio}
              </p>

              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#74777F]">
                <span>Senior Faculty Review</span>
                <span className="font-mono text-[#1A365D]">Verified Fellow</span>
              </div>
            </div>

            {/* Citation Generator Box */}
            <div className={`p-5 rounded border ${cardThemeClasses} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-[0.12em] text-[#1A365D] uppercase">
                  Cite This Paper
                </span>
                <div className="flex items-center gap-1 text-[11px]">
                  {(['mla', 'chicago', 'apa'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setCitationFormat(fmt)}
                      className={`px-1.5 py-0.5 rounded uppercase font-bold cursor-pointer ${
                        citationFormat === fmt ? 'bg-[#1A365D] text-white' : 'text-[#74777F] hover:text-[#161C27]'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#F1F3FF] rounded text-xs font-serif italic text-[#161C27] leading-relaxed border border-[#E2E8F0] select-all">
                {currentArticle.citations[citationFormat]}
              </div>

              <button
                onClick={handleCopyCitation}
                className="w-full py-2 px-3 text-xs font-semibold text-[#1A365D] border border-[#CBD5E1] hover:bg-[#F1F3FF] rounded flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Citation Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#D69E2E]" />
                    <span>Copy {citationFormat.toUpperCase()} Citation</span>
                  </>
                )}
              </button>
            </div>

            {/* Archival Margin Notes & Footnotes Rail */}
            <div className={`p-5 rounded border ${cardThemeClasses} space-y-4`}>
              <div className="text-[11px] font-bold tracking-[0.12em] text-[#7D5700] uppercase flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Archival Marginalia</span>
              </div>

              {currentArticle.bodySections
                .filter((s) => s.marginNote)
                .map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded bg-[#FEFCF6] border border-[#D69E2E]/30 space-y-1 text-xs"
                  >
                    <div className="font-bold text-[#1A365D] text-[11px] uppercase tracking-wider">
                      § {s.marginNote?.label}
                    </div>
                    <p className="text-[#43474E] italic font-serif leading-relaxed">
                      {s.marginNote?.text}
                    </p>
                  </div>
                ))}

              <div className="p-3 rounded bg-[#F1F3FF] border border-[#CBD5E1] space-y-1 text-xs">
                <div className="font-bold text-[#1A365D] text-[11px] uppercase tracking-wider">
                  § Provenance Record
                </div>
                <p className="text-[#43474E] leading-relaxed">
                  Manuscript accepted after double-blind collegiate scrutiny. Preserved in the Digital Humanities Repository (Vol. XIV).
                </p>
              </div>
            </div>

            {/* Department Research Seminar Callout */}
            <div className="p-5 rounded border border-[#CBD5E1] bg-[#FEFCF6] space-y-2">
              <div className="text-[10px] font-bold tracking-wider text-[#D69E2E] uppercase">
                Departmental Colloquium
              </div>
              <h4 className="font-editorial font-bold text-sm text-[#002045]">
                Romantic Studies Research Seminar
              </h4>
              <p className="text-xs text-[#43474E]">
                Meets every alternate Tuesday at 17:00 in Radcliffe Seminar Room 4. Visitors and research students warmly welcomed.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
