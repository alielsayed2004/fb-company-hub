import React from 'react';
import type { PageId } from '../types';
import { COMPANY_CONFIG } from '../data/portalData';
import { Home, FileSpreadsheet, Share2, CreditCard, Globe } from 'lucide-react';

interface BottomNavProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
}

/* Fixed tab bar for mobile & tablet: every destination is one tap away. */
export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage }) => {
  const tabs: { key: string; label: string; icon: React.ReactNode; page?: PageId; href?: string }[] = [
    { key: 'home', label: 'Home', icon: <Home className="w-5 h-5" />, page: 'home' },
    { key: 'sheets', label: 'Sheets', icon: <FileSpreadsheet className="w-5 h-5" />, page: 'sheets' },
    { key: 'social', label: 'Social', icon: <Share2 className="w-5 h-5" />, page: 'social' },
    { key: 'bank', label: 'Bank', icon: <CreditCard className="w-5 h-5" />, href: COMPANY_CONFIG.officialBankPortalUrl },
    { key: 'website', label: 'Website', icon: <Globe className="w-5 h-5" />, href: COMPANY_CONFIG.officialWebsiteUrl },
  ];

  const tabClass = (active: boolean) =>
    `flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl text-[11px] font-semibold transition-colors duration-300 ${
      active ? 'text-[#0B3C49]' : 'text-slate-400 hover:text-slate-600'
    }`;

  const iconWrap = (active: boolean, icon: React.ReactNode) => (
    <span
      className={`flex items-center justify-center w-12 h-7 rounded-full transition-colors duration-300 ${
        active ? 'bg-[#EEF8F2] text-[#2D6A4F]' : ''
      }`}
    >
      {icon}
    </span>
  );

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200/80 shadow-[0_-4px_20px_-12px_rgba(11,60,73,0.15)] pb-[env(safe-area-inset-bottom)]"
      aria-label="Main navigation"
    >
      <div className="max-w-xl mx-auto flex items-stretch px-2 py-1">
        {tabs.map((tab) => {
          if (tab.href) {
            return (
              <a key={tab.key} href={tab.href} target="_blank" rel="noopener noreferrer" className={tabClass(false)}>
                {iconWrap(false, tab.icon)}
                <span>{tab.label}</span>
              </a>
            );
          }
          const active = currentPage === tab.page;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setCurrentPage(tab.page!);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={tabClass(active)}
              aria-current={active ? 'page' : undefined}
            >
              {iconWrap(active, tab.icon)}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
