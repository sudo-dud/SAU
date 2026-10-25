import React from 'react';
import { Clock, BookOpen, Bookmark, ArrowRight, Sparkles, Calendar, MapPin, Award, ChevronRight } from 'lucide-react';
import { Article, SocietyEvent, ARTICLES, SOCIETY_EVENTS, LITERARY_PRIZES } from '../data/editorialData';
import { SafeImage } from './SafeImage';

interface BroadsheetViewProps {
  onSelectArticle: (article: Article) => void;
  onNavigateToTab: (tab: 'broadsheet' | 'reader' | 'activities' | 'archives' | 'submissions') => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  onOpenEventPass: (event: SocietyEvent) => void;
}

export const BroadsheetView: React.FC<BroadsheetViewProps> = ({
  onSelectArticle,
  onNavigateToTab,
  onToggleBookmark,
  isBookmarked,
  onOpenEventPass,
}) => {
  const coverArticle = ARTICLES[0];
  const secondaryArticles = ARTICLES.slice(1, 4);
  const gazetteBulletins = ARTICLES.slice(4);
  const featuredEvents = SOCIETY_EVENTS.slice(0, 3);
  const spotlightPrize = LITERARY_PRIZES[0];

  return (
    <div className="space-y-12 pb-16">
      {/* Operational Utility Ribbon */}
      <div className="bg-[#FFFFFF] border-b border-[#E2E8F0] py-2.5 px-4 sm:px-6">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between text-xs text-[#43474E] gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1A365D] uppercase tracking-wider text-[11px]">
              Library Notice:
            </span>
            <span>Radcliffe Camera & Weston Annex open 08:30–22:00</span>
          </div>

          <div className="flex items-center gap-4 text-[12px]">
            <span className="flex items-center gap-1.5">
              <span className="text-[#D69E2E]">✦</span>
              <span>Exhibition: <em>The First Folio Quarto Re-examined</em></span>
            </span>
            <span className="text-[#C4C6CF] hidden sm:inline">|</span>
            <span className="hidden md:inline">Department Inquiries: Room 212, St. Cross Bldg</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12">
        {/* SECTION 1: LEAD COVER STORY & BROADSIDE ANCHOR (12-Column Editorial Grid) */}
        <section className="border border-[#E2E8F0] bg-[#FFFFFF] rounded p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_-2px_rgba(26,54,93,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Story Details (7 Columns) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-bold tracking-[0.12em] text-[#D69E2E] uppercase">
                  {coverArticle.kicker}
                </span>
                <span className="text-[#CBD5E1]">·</span>
                <span className="text-xs font-serif italic text-[#74777F]">
                  Faculty Monograph Series
                </span>
              </div>

              <h1
                onClick={() => onSelectArticle(coverArticle)}
                className="font-editorial text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#002045] leading-[1.18] tracking-tight hover:text-[#1A365D] cursor-pointer transition-colors"
                style={{ textWrap: 'balance' }}
              >
                {coverArticle.title}
              </h1>

              <p className="font-serif italic text-lg text-[#2B6CB0] leading-snug">
                {coverArticle.subtitle}
              </p>

              <p className="text-[#43474E] text-base leading-relaxed line-clamp-3">
                {coverArticle.abstract}
              </p>

              {/* Byline & Reading Action */}
              <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#CBD5E1]">
                    <SafeImage
                      src={coverArticle.author.avatar}
                      alt={coverArticle.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#161C27]">
                      {coverArticle.author.name}
                    </div>
                    <div className="text-xs text-[#74777F]">
                      {coverArticle.author.role} · <span className="tabular-nums">{coverArticle.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleBookmark(coverArticle.id)}
                    aria-label="Bookmark article"
                    className={`p-2.5 rounded border transition-colors cursor-pointer ${
                      isBookmarked(coverArticle.id)
                        ? 'border-[#D69E2E] text-[#D69E2E] bg-[#FEFCF6]'
                        : 'border-[#CBD5E1] text-[#43474E] hover:border-[#1A365D] hover:text-[#1A365D]'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    onClick={() => onSelectArticle(coverArticle)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#1A365D] hover:bg-[#2B6CB0] text-white text-xs font-semibold rounded transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Read Monograph</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image Frame (5 Columns) */}
            <div className="lg:col-span-5 space-y-2">
              <div
                onClick={() => onSelectArticle(coverArticle)}
                className="group relative cursor-pointer overflow-hidden rounded border border-[#CBD5E1] aspect-[4/3] bg-[#F1F3FF]"
              >
                <SafeImage
                  src={coverArticle.coverImage}
                  alt={coverArticle.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs text-white font-medium flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#D69E2E]" />
                    <span>Open in Literary Reading Room</span>
                  </span>
                </div>
              </div>
              <p className="text-[11px] font-serif italic text-[#74777F] leading-tight">
                {coverArticle.coverCaption}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: CLASSICAL TRIPLE FEATURE GRID (3 Salience Cards) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-2">
            <div className="flex items-center gap-3">
              <h2 className="font-editorial text-2xl font-bold text-[#002045]">
                Curated Monographs & Critical Inquiry
              </h2>
              <span className="text-xs font-serif italic text-[#7D5700] hidden sm:inline">
                Vol. XIV Selected Papers
              </span>
            </div>
            <button
              onClick={() => onNavigateToTab('archives')}
              className="text-xs font-semibold text-[#1A365D] hover:text-[#2B6CB0] flex items-center gap-1 cursor-pointer"
            >
              <span>View Archival Index</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryArticles.map((article, idx) => (
              <article
                key={article.id}
                className="bg-[#FFFFFF] border border-[#E2E8F0] rounded p-5 flex flex-col justify-between hover:border-[#CBD5E1] transition-all shadow-[0_2px_8px_-1px_rgba(26,54,93,0.03)] group"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] overflow-hidden rounded border border-[#E2E8F0] bg-[#F1F3FF] mb-3">
                    <SafeImage
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#FEFCF6]/90 backdrop-blur-sm px-2 py-0.5 border border-[#D69E2E]/40 text-[#1A365D] text-[10px] font-bold tracking-[0.1em] uppercase rounded">
                      {article.genre}
                    </div>
                  </div>

                  <div className="text-[11px] font-bold tracking-[0.12em] text-[#D69E2E] uppercase">
                    {article.kicker}
                  </div>

                  <h3
                    onClick={() => onSelectArticle(article)}
                    className="font-editorial text-xl font-bold text-[#002045] leading-snug group-hover:text-[#1A365D] cursor-pointer transition-colors"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#43474E] line-clamp-3 leading-relaxed">
                    {article.abstract}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#74777F]">
                  <div>
                    <span className="font-semibold text-[#161C27]">{article.author.name}</span>
                    <span className="mx-1.5">·</span>
                    <span className="tabular-nums">{article.readTime}</span>
                  </div>

                  <button
                    onClick={() => onSelectArticle(article)}
                    className="text-[#1A365D] hover:text-[#2B6CB0] font-semibold flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 3: CLASSICAL EDITORIAL PULL QUOTE WITH TWIN HAIRLINES & AMBER DIAMOND */}
        <section className="py-6 px-4 sm:px-8 text-center border-y border-[#CBD5E1] my-8 relative bg-[#FFFFFF]/60">
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-3 text-[#D69E2E]">
              <div className="h-[1px] w-12 bg-[#D69E2E]/40"></div>
              <span className="text-sm">✦</span>
              <div className="h-[1px] w-12 bg-[#D69E2E]/40"></div>
            </div>
            <blockquote className="font-editorial italic text-2xl sm:text-3xl text-[#1A202C] leading-snug">
              "Language is not merely a vehicle of thought, but the very crucible wherein human interiority is minted."
            </blockquote>
            <cite className="block text-xs font-sans uppercase tracking-[0.12em] text-[#7D5700] not-italic font-semibold">
              — The Faculty Board of English · Annual Convocation Address
            </cite>
          </div>
        </section>

        {/* SECTION 4: 2-COLUMN SPLIT (Department Bulletins & Student Gazette vs Student Activities & Colloquium) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Department Bulletins (Compact Horizontal Cards) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-2">
              <h2 className="font-editorial text-2xl font-bold text-[#002045]">
                Departmental Gazette & Dispatches
              </h2>
              <span className="text-xs text-[#74777F]">Michaelmas 2026</span>
            </div>

            <div className="divide-y divide-[#E2E8F0] border-t border-b border-[#E2E8F0] bg-[#FFFFFF] rounded">
              {gazetteBulletins.map((bulletin) => (
                <div
                  key={bulletin.id}
                  onClick={() => onSelectArticle(bulletin)}
                  className="p-5 flex flex-col sm:flex-row gap-5 hover:bg-[#F1F3FF]/40 cursor-pointer transition-colors group"
                >
                  <div className="w-full sm:w-36 h-24 shrink-0 rounded overflow-hidden border border-[#E2E8F0] bg-[#F1F3FF]">
                    <SafeImage
                      src={bulletin.coverImage}
                      alt={bulletin.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] text-[#D69E2E] uppercase">
                      <span>{bulletin.kicker}</span>
                      <span>·</span>
                      <span className="text-[#74777F]">{bulletin.date}</span>
                    </div>
                    <h3 className="font-editorial text-base sm:text-lg font-bold text-[#002045] group-hover:text-[#1A365D] transition-colors leading-snug">
                      {bulletin.title}
                    </h3>
                    <p className="text-xs text-[#43474E] line-clamp-2 leading-relaxed">
                      {bulletin.abstract}
                    </p>
                    <div className="text-[11px] text-[#74777F] pt-1">
                      By {bulletin.author.name} · <span className="tabular-nums">{bulletin.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Additional Curated Notice */}
              <div className="p-5 flex flex-col sm:flex-row gap-5 hover:bg-[#F1F3FF]/40 transition-colors">
                <div className="w-full sm:w-36 h-24 shrink-0 rounded overflow-hidden border border-[#E2E8F0] bg-[#F1F3FF] flex items-center justify-center p-3 text-center">
                  <span className="font-editorial text-2xl font-bold text-[#1A365D]/60 italic">Folio XV</span>
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] text-[#D69E2E] uppercase">
                    <span>CALL FOR PAPERS</span>
                    <span>·</span>
                    <span className="text-[#74777F]">Deadline Dec 1</span>
                  </div>
                  <h3
                    onClick={() => onNavigateToTab('submissions')}
                    className="font-editorial text-base sm:text-lg font-bold text-[#002045] hover:text-[#1A365D] cursor-pointer transition-colors"
                  >
                    Volume XV Thematic Issue: "Palimpsests, Erased Texts, and Digital Scarcity"
                  </h3>
                  <p className="text-xs text-[#43474E] leading-relaxed">
                    Undergraduate and postgraduate submissions are invited across critical essays, poetic sequences, and annotated translation folios.
                  </p>
                  <button
                    onClick={() => onNavigateToTab('submissions')}
                    className="text-[11px] text-[#1A365D] font-semibold hover:underline flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span>Read Author Instructions & Submission Rubric</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Student Activities & Colloquiums Spotlight */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-2">
              <h2 className="font-editorial text-2xl font-bold text-[#002045]">
                Colloquiums & Societies
              </h2>
              <button
                onClick={() => onNavigateToTab('activities')}
                className="text-xs font-semibold text-[#1A365D] hover:text-[#2B6CB0] flex items-center gap-1 cursor-pointer"
              >
                <span>All Activities</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {featuredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-[#FFFFFF] border border-[#E2E8F0] rounded p-4.5 space-y-3 hover:border-[#CBD5E1] transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold tracking-[0.1em] text-[#1A365D] bg-[#F1F3FF] px-2 py-0.5 rounded uppercase">
                      {evt.society}
                    </span>
                    <span className="text-[11px] text-[#7D5700] font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="tabular-nums">{evt.time}</span>
                    </span>
                  </div>

                  <h3 className="font-editorial text-base font-bold text-[#002045] leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-[#43474E] line-clamp-2">
                    {evt.description}
                  </p>

                  <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#74777F]">
                    <div className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-[#74777F]" />
                      <span className="truncate max-w-[180px]">{evt.location}</span>
                    </div>

                    <button
                      onClick={() => onOpenEventPass(evt)}
                      className="px-3 py-1 bg-[#1A365D] hover:bg-[#2B6CB0] text-white text-[11px] font-semibold rounded transition-colors cursor-pointer"
                    >
                      Reserve Pass
                    </button>
                  </div>
                </div>
              ))}

              {/* Endowment Prize Callout Card */}
              <div className="bg-[#FEFCF6] border border-[#D69E2E]/40 rounded p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#7D5700] text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4 text-[#D69E2E]" />
                  <span>Faculty Endowment Prize</span>
                </div>
                <h4 className="font-editorial text-lg font-bold text-[#002045]">
                  {spotlightPrize.name}
                </h4>
                <p className="text-xs text-[#43474E] leading-relaxed">
                  {spotlightPrize.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#D69E2E]/20 text-xs">
                  <span className="font-bold text-[#7D5700]">{spotlightPrize.endowment}</span>
                  <button
                    onClick={() => onNavigateToTab('submissions')}
                    className="text-[#1A365D] font-semibold hover:underline cursor-pointer"
                  >
                    Application Guidelines →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
