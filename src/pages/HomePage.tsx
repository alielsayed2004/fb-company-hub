import React from 'react';
import type { PageId } from '../types';
import { COMPANY_CONFIG } from '../data/portalData';
import {
  CreditCard,
  FileSpreadsheet,
  Share2,
  Globe,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto text-left">
      {/* Clean Hero */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B3C49] tracking-tight mb-3">
          F.B Company Resources Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Direct institutional access to official bank details, operational Google Sheets, and verified channels.
        </p>
      </section>

      {/* 4 Clean Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1: Bank Details */}
        <a
          href={COMPANY_CONFIG.officialBankPortalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 bg-white rounded-2xl border border-slate-200/90 hover:border-[#52B788] hover:shadow-card-hover transition-all duration-150 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#52B788] flex items-center justify-center border border-emerald-100 group-hover:bg-[#0B3C49] group-hover:text-emerald-400 transition-colors">
                <CreditCard className="w-5 h-5" />
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#52B788] transition-colors" />
            </div>

            <h2 className="text-lg font-bold text-[#0B3C49] group-hover:text-[#114B5F] mb-1.5">
              Bank Details
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Official institutional receiving bank accounts and transfer details on the verified bank portal.
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:underline">
            <span>Open Bank Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* Card 2: Sheets & Documents */}
        <button
          onClick={() => setCurrentPage('sheets')}
          className="group p-6 bg-white rounded-2xl border border-slate-200/90 hover:border-[#52B788] hover:shadow-card-hover transition-all duration-150 flex flex-col justify-between text-left"
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#52B788] flex items-center justify-center border border-emerald-100 group-hover:bg-[#0B3C49] group-hover:text-emerald-400 transition-colors">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#52B788] group-hover:translate-x-0.5 transition-all" />
            </div>

            <h2 className="text-lg font-bold text-[#0B3C49] group-hover:text-[#114B5F] mb-1.5">
              Sheets & Documents
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Access active operational Google Sheets for attendance, inquiries, hiring, and brand qualification.
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:underline">
            <span>Explore Sheets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Card 3: Social Media */}
        <button
          onClick={() => setCurrentPage('social')}
          className="group p-6 bg-white rounded-2xl border border-slate-200/90 hover:border-[#52B788] hover:shadow-card-hover transition-all duration-150 flex flex-col justify-between text-left"
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#52B788] flex items-center justify-center border border-emerald-100 group-hover:bg-[#0B3C49] group-hover:text-emerald-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#52B788] group-hover:translate-x-0.5 transition-all" />
            </div>

            <h2 className="text-lg font-bold text-[#0B3C49] group-hover:text-[#114B5F] mb-1.5">
              Official Social Media
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Verified corporate accounts on Facebook, X, Instagram, LinkedIn, and TikTok.
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:underline">
            <span>View Social Profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Card 4: Official Website */}
        <a
          href={COMPANY_CONFIG.officialWebsiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 bg-white rounded-2xl border border-slate-200/90 hover:border-[#52B788] hover:shadow-card-hover transition-all duration-150 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#52B788] flex items-center justify-center border border-emerald-100 group-hover:bg-[#0B3C49] group-hover:text-emerald-400 transition-colors">
                <Globe className="w-5 h-5" />
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#52B788] transition-colors" />
            </div>

            <h2 className="text-lg font-bold text-[#0B3C49] group-hover:text-[#114B5F] mb-1.5">
              Official Website
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Learn about F.B Company asset management and prime franchise locations in Egypt (fbassets.com).
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:underline">
            <span>Visit fbassets.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </a>
      </div>
    </div>
  );
};
