import React, { useState, useMemo } from 'react';
import type { SheetLink } from '../types';
import { FileSpreadsheet, Search, X, Lock, LogOut } from 'lucide-react';
import { IconTile, LinkArrow } from '../components/ui';

const SHEET_URL = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[A-Za-z0-9_-]+\/edit\?usp=sharing$/;

const ERROR_MESSAGES: Record<number, string> = {
  401: 'الباسورد غلط. جرّب تاني.',
  429: 'محاولات كتير غلط. استنى ربع ساعة وجرّب تاني.',
  500: 'الصفحة لسه مش متظبطة على السيرفر. كلّم المسؤول.',
};

export const SheetsPage: React.FC = () => {
  // Sheets live only in memory: leaving the page or reloading asks for the password again.
  const [sheets, setSheets] = useState<SheetLink[] | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        cache: 'no-store',
      });
      if (!response.ok) {
        setError(ERROR_MESSAGES[response.status] ?? 'حصلت مشكلة. جرّب تاني.');
        return;
      }
      const data: { sheets?: SheetLink[] } = await response.json();
      setSheets((data.sheets ?? []).filter((sheet) => SHEET_URL.test(sheet.url)));
      setPassword('');
    } catch {
      setError('مفيش اتصال بالإنترنت. جرّب تاني.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setSheets(null);
    setSearchQuery('');
  };

  const filteredSheets = useMemo(() => {
    if (!sheets) return [];
    const q = searchQuery.toLowerCase().trim();
    return sheets
      .map((sheet, index) => ({ ...sheet, number: index + 1 }))
      .filter((sheet) => !q || sheet.title.toLowerCase().includes(q));
  }, [sheets, searchQuery]);

  if (!sheets) {
    return (
      <div dir="rtl" className="max-w-md mx-auto text-right">
        <form
          onSubmit={handleLogin}
          className="animate-fadeUp bg-white rounded-3xl border border-slate-200/80 shadow-card-hover p-6 sm:p-8"
        >
          <IconTile size="lg">
            <Lock className="w-5 h-5" />
          </IconTile>
          <h1 className="mt-4 text-xl sm:text-2xl font-extrabold text-[#0B3C49]">شيتات الشركة</h1>
          <p className="mt-1.5 mb-6 text-sm text-slate-500 leading-relaxed">
            الصفحة دي لفريق F.B Company بس. اكتب الباسورد علشان تظهر الشيتات.
          </p>

          <label htmlFor="sheets-password" className="block text-xs font-bold text-[#0B3C49] mb-2">
            الباسورد
          </label>
          <input
            id="sheets-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir="ltr"
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-[#52B788] focus:ring-4 focus:ring-emerald-100 text-base text-slate-800 text-right outline-none transition-all duration-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-3 rounded-xl bg-[#0B3C49] hover:bg-[#114B5F] disabled:opacity-60 text-white text-sm font-bold transition-colors duration-300"
          >
            {loading ? 'جاري الدخول…' : 'دخول'}
          </button>

          <p role="alert" className="min-h-5 mt-3 text-xs font-semibold text-red-700 text-center">
            {error}
          </p>
        </form>
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-6 max-w-5xl mx-auto text-right">
      <div className="animate-fadeUp flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3C49] tracking-tight">
            شيتات الشركة
          </h1>
          <p className="text-sm text-slate-500 mt-1">دوس على أي شيت يفتح في تاب جديد.</p>
        </div>
        <button
          onClick={handleLogout}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:text-[#0B3C49] hover:border-slate-300 transition-colors duration-300"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>خروج</span>
        </button>
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

      <p className="text-center text-xs text-slate-400">ما تشاركش الباسورد أو اللينكات دي برّه فريق الشركة.</p>
    </div>
  );
};
