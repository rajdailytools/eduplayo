import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { SoundProvider } from './context/SoundContext';
import { ProgressProvider } from './context/ProgressContext';
import { AnnouncementStrip } from './components/common/AnnouncementStrip';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { BadgeModal } from './components/common/BadgeModal';
import { ResetModal } from './components/common/ResetModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ClassesPage } from './pages/ClassesPage';
import { ClassDetailPage } from './pages/ClassDetailPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { ChapterDetailPage } from './pages/ChapterDetailPage';
import { GamePlayerPage } from './pages/GamePlayerPage';
import { PracticePage } from './pages/PracticePage';
import { ChallengesPage } from './pages/ChallengesPage';
import { RevisionPage } from './pages/RevisionPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [resetModalOpen, setResetModalOpen] = useState(false);

  return (
    <LanguageProvider>
      <SoundProvider>
        <ProgressProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
              {/* Configurable Announcement Strip */}
              <AnnouncementStrip />

              {/* Main Responsive Header */}
              <Header />

              {/* Main App Content */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage onOpenResetModal={() => setResetModalOpen(true)} />} />
                  <Route path="/classes" element={<ClassesPage />} />
                  <Route path="/classes/:classId" element={<ClassDetailPage />} />
                  <Route path="/classes/:classId/:subjectId" element={<SubjectDetailPage />} />
                  <Route path="/chapters/:chapterId" element={<ChapterDetailPage />} />
                  <Route path="/games/:gameId" element={<GamePlayerPage />} />
                  <Route path="/practice/:chapterId" element={<PracticePage />} />
                  <Route path="/challenges" element={<ChallengesPage />} />
                  <Route path="/revision" element={<RevisionPage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/disclaimer" element={<DisclaimerPage />} />
                  <Route path="/accessibility" element={<AccessibilityPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              {/* Celebration Modal for Badges and Confetti */}
              <BadgeModal />

              {/* Progress Reset Confirmation Modal */}
              <ResetModal isOpen={resetModalOpen} onClose={() => setResetModalOpen(false)} />

              {/* Comprehensive Transparent Footer */}
              <Footer />
            </div>
          </BrowserRouter>
        </ProgressProvider>
      </SoundProvider>
    </LanguageProvider>
  );
}
