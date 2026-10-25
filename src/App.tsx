import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { BroadsheetView } from './components/BroadsheetView';
import { ReaderView } from './components/ReaderView';
import { StudentActivitiesView } from './components/StudentActivitiesView';
import { ArchivesView } from './components/ArchivesView';
import { SubmissionsView } from './components/SubmissionsView';
import { ResearchFolioModal } from './components/ResearchFolioModal';
import { ActivityPassModal } from './components/ActivityPassModal';
import { Footer } from './components/Footer';
import { ARTICLES, Article, SocietyEvent } from './data/editorialData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('broadsheet');
  const [currentArticle, setCurrentArticle] = useState<Article>(ARTICLES[0]);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('quill_saved_articles');
      return stored ? JSON.parse(stored) : [ARTICLES[0].id];
    } catch {
      return [ARTICLES[0].id];
    }
  });

  // Modals state
  const [isFolioOpen, setIsFolioOpen] = useState(false);
  const [activeEventForPass, setActiveEventForPass] = useState<SocietyEvent | null>(null);

  // Sync saved bookmarks with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('quill_saved_articles', JSON.stringify(savedArticleIds));
    } catch {
      // ignore
    }
  }, [savedArticleIds]);

  const handleToggleBookmark = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const isBookmarked = (articleId: string) => savedArticleIds.includes(articleId);

  const handleSelectArticle = (article: Article) => {
    setCurrentArticle(article);
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#161C27] antialiased selection:bg-[#FFC250]/30 selection:text-[#002045]">
      {/* Editorial Masthead & Navigation Bar */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        savedCount={savedArticleIds.length}
        onOpenFolio={() => setIsFolioOpen(true)}
        onOpenSubmissionModal={() => handleTabChange('submissions')}
      />

      {/* Main Viewport Router */}
      <main className="flex-1">
        {activeTab === 'broadsheet' && (
          <BroadsheetView
            onSelectArticle={handleSelectArticle}
            onNavigateToTab={handleTabChange}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            onOpenEventPass={(evt) => setActiveEventForPass(evt)}
          />
        )}

        {activeTab === 'reader' && (
          <ReaderView
            currentArticle={currentArticle}
            onSelectArticle={setCurrentArticle}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            onBackToBroadsheet={() => handleTabChange('broadsheet')}
          />
        )}

        {activeTab === 'activities' && (
          <StudentActivitiesView
            onOpenEventPass={(evt) => setActiveEventForPass(evt)}
          />
        )}

        {activeTab === 'archives' && (
          <ArchivesView
            onSelectArticle={handleSelectArticle}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {activeTab === 'submissions' && (
          <SubmissionsView
            onAddSubmittedManuscript={(sub) => {
              // Could also add tracking reference to folio
            }}
          />
        )}
      </main>

      {/* Scholarly Footer */}
      <Footer onNavigate={handleTabChange} />

      {/* Research Folio Modal Drawer */}
      <ResearchFolioModal
        isOpen={isFolioOpen}
        onClose={() => setIsFolioOpen(false)}
        savedArticleIds={savedArticleIds}
        onRemoveBookmark={handleToggleBookmark}
        onSelectArticle={handleSelectArticle}
      />

      {/* Colloquium & Society Activity Pass Modal */}
      <ActivityPassModal
        event={activeEventForPass}
        onClose={() => setActiveEventForPass(null)}
      />
    </div>
  );
}
