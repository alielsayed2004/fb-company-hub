import React, { useState } from 'react';
import type { PageId } from '../types';
import { COMPANY_CONFIG } from '../data/portalData';
import {
  FileSpreadsheet,
  Share2,
  Globe,
  ArrowUpRight,
  Menu,
  X,
  CreditCard,
  Home
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  onOpenShare,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'sheets', label: 'Sheets & Documents', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'social', label: 'Social Media', icon: <Share2 className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-header border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none shrink-0"
            aria-label="F.B Company Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center p-1 group-hover:border-[#52B788] transition-colors duration-300">
              <img
                src="/fb-logo.jpg"
                alt="F.B Company Logo"
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/icon.svg';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg text-[#0B3C49] tracking-tight group-hover:text-[#114B5F] transition-colors duration-300">
                F.B Company
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {COMPANY_CONFIG.tagline}
              </span>
            </div>
          </button>

          {/* Center Desktop Navigation */}
          <nav className="hidden lg:flex items-center p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200/70">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-300 ${
                    isActive
                      ? 'bg-[#0B3C49] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0B3C49] hover:bg-white/80'
                  }`}
                >
                  <span className={isActive ? 'text-[#8FD9B6]' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Divider */}
            <div className="w-px h-5 bg-slate-300 mx-1" />

            {/* Direct Bank Details link (opens in new tab) */}
            <a
              href={COMPANY_CONFIG.officialBankPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-[#0B3C49] hover:bg-white/80 transition-colors duration-300"
              title="View official verified bank transfer details"
            >
              <CreditCard className="w-4 h-4 text-slate-400" />
              <span>Bank Details</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {/* Official Website link (opens in new tab) */}
            <a
              href={COMPANY_CONFIG.officialWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-[#0B3C49] hover:bg-white/80 transition-colors duration-300"
              title="Visit official company website (fbassets.com)"
            >
              <Globe className="w-4 h-4 text-slate-400" />
              <span>Official Website</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </nav>

          {/* Right Action: Share Hub Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F4FBF7] text-[#0B3C49] border border-emerald-200/90 hover:bg-[#e6f7ef] hover:border-[#52B788] transition-colors duration-300"
            >
              <Share2 className="w-4 h-4 text-[#52B788]" />
              <span>Share Hub</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenShare}
              className="p-2.5 rounded-xl border border-emerald-200 bg-[#F4FBF7] text-[#0B3C49] sm:hidden"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4 text-[#52B788]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors duration-300"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/95 px-4 sm:px-6 pt-3 pb-5 space-y-1.5 shadow-lg animate-scaleIn origin-top">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-colors duration-300 ${
                  isActive
                    ? 'bg-[#0B3C49] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className={isActive ? 'text-[#8FD9B6]' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <a
            href={COMPANY_CONFIG.officialBankPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors duration-300"
          >
            <span className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-slate-400" />
              <span>Bank Details</span>
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </a>

          <a
            href={COMPANY_CONFIG.officialWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors duration-300"
          >
            <span className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-slate-400" />
              <span>Official Website</span>
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </a>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenShare();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-[#F4FBF7] text-[#0B3C49] border border-emerald-200"
            >
              <Share2 className="w-4 h-4 text-[#52B788]" />
              <span>Share Hub</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
