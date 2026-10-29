import React, { useState, useMemo, useEffect } from 'react';
import type { SheetLink } from '../types';
import { FileSpreadsheet, Search, X } from 'lucide-react';
import { IconTile, LinkArrow } from '../components/ui';

const SHEET_URL = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[A-Za-z0-9_-]+\/edit\?usp=sharing$/;

export const SheetsPage: React.FC = () => {
  const [sheets, setSheets] = useState<SheetLink[] | null>(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/sheets', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error(String(response.status));
        const data: { sheets?: SheetLink[] } = await response.json();
        if (!cancelled) setSheets((data.sheets ?? []).filter((sheet) => SHEET_URL.test(sheet.url)));
      })
      .catch(() => {
        if (!cancelled) setError('مقدرناش نجيب الشيتات دلوقتي. جرّب تاني.');
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const filteredSheets = useMemo(() => {
    if (!sheets) return [];
    const q = searchQuery.toLowerCase().trim();
    return sheets
      .map((sheet, index) => ({ ...sheet, number: index + 1 }))
      .filter((sheet) => !q || sheet.title.toLowerCase().includes(q));
  }, [sheets, searchQuery]);

  if (!sheets) {
    return (
      <div dir="rtl" className="max-w-5xl mx-auto text-right">
        {error ? (
          <div className="animate-fadeIn bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <p className="text-sm font-semibold text-slate-600">{error}</p>
            <button
              onClick={() => {
                setError('');
                setReloadKey((k) => k + 1);
              }}
              className="mt-2 text-xs text-[#52B788] hover:underline font-semibold"
            >
              حاول تاني
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" aria-busy="true">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="h-[76px] rounded-[1.25rem] bg-white border border-slate-200/80 animate-pulse" />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-6 max-w-5xl mx-auto text-right">
      <div className="animate-fadeUp">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3C49] tracking-tight">
            شيتات الشركة
          </h1>
          <p className="text-sm text-slate-500 mt-1">دوس على أي شيت يفتح في تاب جديد.</p>
        </div>
      </div>

      {/* Search */}
      <div className="animate-fadeUp relative w-full md:w-72">
        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن شيت..."
          className="w-full pr-9 pl-8 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#52B788] focus:ring-4 focus:ring-emerald-100 text-sm md:text-xs text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            aria-label="مسح البحث"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {filteredSheets.length > 0 ? (
        <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredSheets.map((sheet) => (
            <a
              key={sheet.url}
              href={sheet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group soft-card p-4 sm:p-5 flex items-center gap-3.5"
            >
              <IconTile>
                <FileSpreadsheet className="w-5 h-5" />
              </IconTile>
              <div className="flex-1 min-w-0">
                <span className="block text-[11px] font-bold text-slate-400 tabular-nums">
                  {String(sheet.number).padStart(2, '0')}
                </span>
                <h3 dir="auto" className="text-sm sm:text-base font-bold text-[#0B3C49] text-right break-words">
                  {sheet.title}
                </h3>
              </div>
              <LinkArrow external />
            </a>
          ))}
        </div>
      ) : (
        <div className="animate-fadeIn bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <p className="text-sm font-semibold text-slate-600">مفيش شيت بالاسم ده</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-2 text-xs text-[#52B788] hover:underline font-semibold"
          >
            امسح البحث
          </button>
        </div>
      )}

    </div>
  );
};
