import React from 'react';
import type { PageId } from '../types';
import { COMPANY_CONFIG } from '../data/portalData';
import { CreditCard, FileSpreadsheet, Share2, Globe } from 'lucide-react';
import { IconTile, LinkArrow } from '../components/ui';

interface HomePageProps {
  setCurrentPage: (page: PageId) => void;
}

interface HomeCard {
  key: string;
  title: string;
  description: string;
  cta: string;
  icon: React.ReactNode;
  href?: string;
  page?: PageId;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const cards: HomeCard[] = [
    {
      key: 'bank',
      title: 'Bank Details',
      description: 'Official institutional receiving bank accounts and transfer details on the verified bank portal.',
      cta: 'Open Bank Portal',
      icon: <CreditCard className="w-5 h-5" />,
      href: COMPANY_CONFIG.officialBankPortalUrl,
    },
    {
      key: 'sheets',
      title: 'Sheets & Documents',
      description: 'Access active operational Google Sheets for attendance, inquiries, hiring, and brand qualification.',
      cta: 'Explore Sheets',
      icon: <FileSpreadsheet className="w-5 h-5" />,
      page: 'sheets',
    },
    {
      key: 'social',
      title: 'Official Social Media',
      description: 'Verified corporate accounts on Facebook, X, Instagram, LinkedIn, and TikTok.',
      cta: 'View Social Profiles',
      icon: <Share2 className="w-5 h-5" />,
      page: 'social',
    },
    {
      key: 'website',
      title: 'Official Website',
      description: 'Learn about F.B Company asset management and prime franchise locations in Egypt (fbassets.com).',
      cta: 'Visit fbassets.com',
      icon: <Globe className="w-5 h-5" />,
      href: COMPANY_CONFIG.officialWebsiteUrl,
    },
  ];

  const cardBody = (card: HomeCard) => (
    <>
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <IconTile>{card.icon}</IconTile>
          <LinkArrow external={!!card.href} />
        </div>

        <h2 className="text-base sm:text-lg font-bold text-[#0B3C49] mb-1.5">
          {card.title}
        </h2>
        <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed mb-5">
          {card.description}
        </p>
      </div>

      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
        <span>{card.cta}</span>
        <LinkArrow external={!!card.href} className="w-3.5 h-3.5" />
      </div>
    </>
  );

  const cardClass = 'group soft-card p-5 sm:p-6 flex flex-col justify-between text-left h-full';

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto text-left">
      {/* Hero */}
      <section className="animate-fadeUp p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-white via-white to-emerald-50/60 border border-slate-200/80 shadow-subtle">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3C49] tracking-tight mb-3">
          F.B Company Resources Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Direct institutional access to official bank details, operational Google Sheets, and verified channels.
        </p>
      </section>

      {/* Action Cards */}
      <div className="stagger grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {cards.map((card) =>
          card.href ? (
            <a key={card.key} href={card.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
              {cardBody(card)}
            </a>
          ) : (
            <button key={card.key} onClick={() => card.page && setCurrentPage(card.page)} className={cardClass}>
              {cardBody(card)}
            </button>
          )
        )}
      </div>
    </div>
  );
};
