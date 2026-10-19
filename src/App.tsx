import { useState, useEffect } from 'react';
import type { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ShareModal } from './components/ShareModal';
import { HomePage } from './pages/HomePage';
import { SheetsPage } from './pages/SheetsPage';
import { SocialMediaPage } from './pages/SocialMediaPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.title = 'F.B Company | Official Resources & Links Hub';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#0B3C49]/15 selection:text-[#0B3C49]">
      {/* Sticky Top Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenShare={() => setShareModalOpen(true)}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentPage === 'home' && (
          <HomePage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'sheets' && <SheetsPage />}
        {currentPage === 'social' && <SocialMediaPage />}
      </main>

      {/* Institutional Footer */}
      <Footer
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Share Portal Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
}

export default App;
