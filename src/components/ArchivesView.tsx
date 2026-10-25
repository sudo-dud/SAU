import React, { useState } from 'react';
import { Search, Filter, BookOpen, Bookmark, ArrowUpRight, Copy, Check, Download } from 'lucide-react';
import { Article, ARTICLES } from '../data/editorialData';

interface ArchivesViewProps {
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
}

export const ArchivesView: React.FC<ArchivesViewProps> = ({
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'volume' | 'title' | 'readTime'>('volume');
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);

  const genres = ['All', 'Critical Essay', 'Poetry', 'Faculty Research', 'Translations', 'Department News'];

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesGenre = selectedGenre === 'All' || art.genre === selectedGenre;
    const matchesQuery =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGenre && matchesQuery;
  }).sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'readTime') return parseInt(b.readTime) - parseInt(a.readTime);
    return 0; // Default volume/issue order
  });

  const handleCopyDoi = (doi: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(`https://doi.org/${doi}`);
    setCopiedDoi(doi);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-10 pb-24">
      {/* Archive Header */}
      <section className="bg-[#FFFFFF] border border-[#E2E8F0] rounded p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-2 text-xs">
          <span className="font-bold tracking-[0.12em] text-[#D69E2E] uppercase">
            Departmental Repositories & Print Retrospectives
          </span>
          <span className="text-[#74777F] font-mono">Archive Registry · Vol. I – XIV</span>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#002045]">
            Curated Archival Index & Manuscripts
          </h1>
          <p className="text-sm text-[#43474E] leading-relaxed">
            A comprehensive, chronologically classified register of peer-reviewed monographs, student poetics, archival discoveries, and faculty translations published under the departmental imprint.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-4 border-t border-[#E2E8F0] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#74777F] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, author, or critical term..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded focus:outline-none focus:border-[#1A365D]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Genre filter buttons */}
            <div className="flex flex-wrap items-center gap-1 bg-[#F1F3FF] p-1 rounded">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer transition-colors ${
                    selectedGenre === g
                      ? 'bg-white text-[#002045] shadow-xs'
                      : 'text-[#43474E] hover:text-[#002045]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded px-2.5 py-1.5 text-[#161C27] focus:outline-none cursor-pointer"
            >
              <option value="volume">Chronological Order</option>
              <option value="title">Alphabetical (Title)</option>
              <option value="readTime">Reading Duration</option>
            </select>
          </div>
        </div>
      </section>

      {/* CURATED ARCHIVE ROWS (Strict Broadside Index Format) */}
      <section className="bg-[#FFFFFF] border border-[#E2E8F0] rounded overflow-hidden shadow-xs">
        <div className="px-6 py-3 bg-[#F1F3FF]/40 border-b border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#1A365D] uppercase tracking-wider">
          <div className="flex items-center gap-4">
            <span className="w-10">No.</span>
            <span>Monograph Title & Subject</span>
          </div>
          <div className="hidden md:flex items-center gap-12 text-[#74777F]">
            <span>Genre</span>
            <span>Volume & Issue</span>
            <span>Duration</span>
            <span>Actions</span>
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center text-sm text-[#74777F] space-y-2">
            <p>No monographs found matching your archival query.</p>
            <button
              onClick={() => {
                setSelectedGenre('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#1A365D] underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {filteredArticles.map((article, idx) => {
              const rowNum = String(idx + 1).padStart(2, '0');
              const bookmarked = isBookmarked(article.id);

              return (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F1F3FF]/30 transition-colors cursor-pointer group"
                >
                  {/* Left: Index number + Title + Author */}
                  <div className="flex items-start gap-4 flex-1">
                    <span className="font-editorial italic font-bold text-lg text-[#D69E2E] w-10 shrink-0 tabular-nums pt-0.5">
                      {rowNum}.
                    </span>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-editorial text-base sm:text-lg font-bold text-[#002045] group-hover:text-[#1A365D] transition-colors leading-snug">
                          {article.title}
                        </h3>
                        {/* Mobile genre badge */}
                        <span className="md:hidden text-[10px] bg-[#F1F5F9] text-[#161C27] px-2 py-0.2 rounded border border-[#E2E8F0]">
                          {article.genre}
                        </span>
                      </div>

                      <div className="text-xs text-[#74777F] flex flex-wrap items-center gap-2">
                        <span className="text-[#161C27] font-semibold">{article.author.name}</span>
                        <span>·</span>
                        <span className="italic">{article.author.role}</span>
                        <span>·</span>
                        <span className="font-mono text-[11px] text-[#74777F]">DOI: {article.doi}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right metadata columns on desktop */}
                  <div className="hidden md:flex items-center gap-8 text-xs text-[#74777F] shrink-0">
                    <span className="w-28 text-center bg-[#F1F5F9] text-[#161C27] px-2.5 py-1 rounded border border-[#E2E8F0] text-[11px] truncate">
                      {article.genre}
                    </span>

                    <span className="w-24 font-mono text-[11px]">
                      {article.volume}, {article.issue}
                    </span>

                    <span className="w-20 font-mono text-[11px] tabular-nums">
                      {article.readTime}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleCopyDoi(article.doi, e)}
                        title="Copy DOI Link"
                        className="p-1.5 rounded hover:bg-[#E2E8F0]/60 text-[#74777F] hover:text-[#161C27] cursor-pointer"
                      >
                        {copiedDoi === article.doi ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => onToggleBookmark(article.id)}
                        title="Save to Folio"
                        className={`p-1.5 rounded hover:bg-[#E2E8F0]/60 cursor-pointer ${
                          bookmarked ? 'text-[#D69E2E]' : 'text-[#74777F] hover:text-[#161C27]'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <button
                        onClick={() => onSelectArticle(article)}
                        className="p-1.5 rounded hover:bg-[#E2E8F0]/60 text-[#1A365D] cursor-pointer"
                        title="Open Article"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* DEPARTMENTAL SPECIAL COLLECTIONS NOTICE */}
      <section className="bg-[#FEFCF6] border border-[#D69E2E]/40 rounded p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-[10px] font-bold tracking-wider text-[#7D5700] uppercase">
            Manuscript Consultation & Special Collections
          </span>
          <h4 className="font-editorial text-xl font-bold text-[#002045]">
            Request Physical Foliated Copies in the Upper Reading Room
          </h4>
          <p className="text-xs text-[#43474E] leading-relaxed">
            Volumes I through XIII are bound in half-morocco calfskin and available for supervised consultation upon presentation of a valid University Reader's Card.
          </p>
        </div>

        <button
          onClick={() => {
            alert('Consultation docket prepared. Present your reader card at Room 114, Weston Library.');
          }}
          className="px-4 py-2.5 bg-[#1A365D] hover:bg-[#2B6CB0] text-white text-xs font-semibold rounded whitespace-nowrap cursor-pointer transition-colors shadow-sm"
        >
          Request Physical Docket
        </button>
      </section>
    </div>
  );
};
