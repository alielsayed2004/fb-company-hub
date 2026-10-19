import React from 'react';
import type { Language } from '../types';

import { translations } from '../data/translations';
import { ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';

interface SecurityBannerProps {
  language: Language;
  compact?: boolean;
}

export const SecurityBanner: React.FC<SecurityBannerProps> = ({ language, compact = false }) => {
  const t = translations[language];

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs font-medium">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <span>{t.securityNoticeText}</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-amber-50/90 via-emerald-50/50 to-slate-50 border border-amber-200/70 rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-sm text-[#0B3C49]">
                {t.securityBadge}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                <Lock className="w-3 h-3 text-[#52B788]" />
                <span>{t.securityReadOnly}</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
              {t.securityNoticeText}
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-white/90 border border-emerald-200/80 px-3 py-1.5 rounded-xl shrink-0">
          <CheckCircle2 className="w-4 h-4 text-[#52B788]" />
          <span>{language === 'ar' ? 'بوابة معتمدة ومحمية' : 'Verified & Secure Gateway'}</span>
        </div>
      </div>
    </div>
  );
};
