import React, { useState } from 'react';
import { Bookmark, X, BookOpen, Trash2, Download, Copy, Check, ExternalLink } from 'lucide-react';
import { Article, ARTICLES } from '../data/editorialData';

interface ResearchFolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticleIds: string[];
  onRemoveBookmark: (articleId: string) => void;
  onSelectArticle: (article: Article) => void;
}

export const ResearchFolioModal: React.FC<ResearchFolioModalProps> = ({
  isOpen,
  onClose,
  savedArticleIds,
  onRemoveBookmark,
  onSelectArticle,
}) => {
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  if (!isOpen) return null;

  const savedArticles = ARTICLES.filter((a) => savedArticleIds.includes(a.id));

  const generateBibtex = () => {
    return savedArticles
      .map((a) => {
        const key = `${a.author.name.split(' ').pop()?.toLowerCase() || 'author'}2026`;
        return `@article{${key},
  author  = {${a.author.name}},
  title   = {${a.title}},
  journal = {The Quill \\& Folio},
  volume  = {14},
  number  = {3},
  year    = {2026},
  doi     = {${a.doi}}
}`;
      })
      .join('\n\n');
  };

  const handleCopyBibtex = () => {
    const bib = generateBibtex();
    navigator.clipboard?.writeText(bib);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#CBD5E1] rounded max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <div className="flex items-center gap-2 text-[#7D5700] text-xs font-bold uppercase tracking-wider">
              <Bookmark className="w-4 h-4 text-[#D69E2E] fill-current" />
              <span>Collegiate Personal Dossier</span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#002045]">
              Personal Research Folio ({savedArticles.length})
            </h3>
            <p className="text-xs text-[#74777F]">
              Saved monographs, poetics, and citations earmarked for seminar reference.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#74777F] hover:text-[#161C27] p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {savedArticles.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#74777F] space-y-2 border border-dashed border-[#CBD5E1] rounded">
              <BookOpen className="w-8 h-8 text-[#CBD5E1] mx-auto mb-1" />
              <p className="font-medium text-[#161C27]">Your Research Folio is currently empty.</p>
              <p>Bookmark monographs from the broadsheet or reading room to assemble your working bibliography.</p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="p-4 bg-[#FBFBFA] border border-[#E2E8F0] hover:border-[#1A365D] rounded transition-all flex items-start justify-between gap-4 group"
              >
                <div
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="space-y-1 cursor-pointer flex-1"
                >
                  <span className="text-[10px] font-bold text-[#D69E2E] uppercase tracking-wider">
                    {art.genre} · {art.volume}
                  </span>
                  <h4 className="font-editorial font-bold text-base text-[#002045] group-hover:text-[#1A365D] transition-colors line-clamp-1">
                    {art.title}
                  </h4>
                  <div className="text-xs text-[#74777F]">
                    By {art.author.name} · <span className="tabular-nums font-mono">{art.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 pt-1">
                  <button
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    title="Open in Reader"
                    className="p-1.5 rounded hover:bg-[#E2E8F0] text-[#1A365D] cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(art.id)}
                    title="Remove from Folio"
                    className="p-1.5 rounded hover:bg-[#E2E8F0] text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {savedArticles.length > 0 && (
          <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              onClick={handleCopyBibtex}
              className="py-2 px-3 border border-[#CBD5E1] rounded hover:bg-[#F1F3FF] flex items-center gap-1.5 font-semibold text-[#1A365D] cursor-pointer transition-colors"
            >
              {copiedBibtex ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">BibTeX Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#D69E2E]" />
                  <span>Copy BibTeX Bibliography</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="py-2 px-4 bg-[#1A365D] text-white rounded hover:bg-[#2B6CB0] font-semibold cursor-pointer"
            >
              Close Folio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
