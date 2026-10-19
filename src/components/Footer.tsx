import React from 'react';
import type { PageId } from '../types';
import { COMPANY_CONFIG, OFFICIAL_SOCIALS } from '../data/portalData';
import {
  Globe,
  ExternalLink,
  ShieldCheck,
  ArrowUp,
  FileSpreadsheet,
  CreditCard,
  Share2
} from 'lucide-react';

interface FooterProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentPage,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#08262E] text-slate-300 border-t border-[#0B3C49] mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 p-1 flex items-center justify-center border border-white/10">
                <img
                  src="/fb-logo.jpg"
                  alt="F.B Company Logo"
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/icon.svg';
                  }}
                />
              </div>
              <div>
                <span className="font-bold text-lg text-white font-mono-code block">
                  {COMPANY_CONFIG.nameEn}
                </span>
                <span className="text-xs text-emerald-400 font-medium">
                  {COMPANY_CONFIG.tagline}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {COMPANY_CONFIG.activityDescriptionEn}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#52B788]" />
              <span>Official Institutional Hub</span>
            </div>
          </div>

          {/* Portal Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wider uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    scrollToTop();
                  }}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <a
                  href={COMPANY_CONFIG.officialBankPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group"
                >
                  <CreditCard className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>Bank Details</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white" />
                </a>
              </li>

              <li>
                <button
                  onClick={() => {
                    setCurrentPage('sheets');
                    scrollToTop();
                  }}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>Sheets & Documents</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('social');
                    scrollToTop();
                  }}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>Social Media</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Official External Portals */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wider uppercase">
              Official Resources
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href={COMPANY_CONFIG.officialWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-white group"
                >
                  <Globe className="w-4 h-4 text-[#52B788]" />
                  <span className="font-mono-code font-medium">fbassets.com</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white" />
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_CONFIG.officialBankPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-white group"
                >
                  <CreditCard className="w-4 h-4 text-[#52B788]" />
                  <span>Official Bank Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white" />
                </a>
              </li>
              <li className="pt-2 text-xs text-slate-400">
                <span className="block font-medium text-slate-300 mb-1">
                  Headquarters:
                </span>
                Cairo, Arab Republic of Egypt
              </li>
            </ul>
          </div>

          {/* Social Links & Back to top */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wider uppercase">
              Official Channels
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {OFFICIAL_SOCIALS.map((soc) => (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <span>{soc.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowUp className="w-4 h-4 text-[#52B788]" />
              <span>Back to top</span>
            </button>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-left leading-relaxed max-w-2xl">
            This hub is strictly a directory for official corporate resources and links. F.B Company will never request passwords, PINs, OTPs, or online banking credentials through this portal.
          </p>
          <div className="text-left md:text-right shrink-0">
            <p className="font-medium text-slate-300">All rights reserved © F.B Company</p>
            <p className="text-[11px] text-slate-500 mt-0.5">F.B Company — Assets Management | From Vision to Value</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
