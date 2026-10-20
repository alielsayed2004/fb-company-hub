import React, { useState, useMemo } from 'react';
import { OFFICIAL_SHEETS } from '../data/portalData';
import { FileSpreadsheet, Search, X } from 'lucide-react';
import { IconTile, LinkArrow } from '../components/ui';

export const SheetsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'hr-ops', label: 'Operations & HR' },
    { id: 'consulting-leads', label: 'Leads & Consulting' },
    { id: 'data-brands', label: 'Assets & Brands' },
  ];

  const filteredSheets = useMemo(() => {
    return OFFICIAL_SHEETS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.titleAr.toLowerCase().includes(q) ||
        item.titleEn.toLowerCase().includes(q) ||
        item.descriptionEn.toLowerCase().includes(q) ||
        item.categoryEn.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left">
      {/* Clean Minimal Header */}
      <div className="animate-fadeUp">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3C49] tracking-tight">
          Sheets & Documents
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Click any document to open directly in Google Sheets.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="animate-fadeUp flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 order-2 md:order-1 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-[#0B3C49] border-[#0B3C49] text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative order-1 md:order-2 w-full md:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sheets..."
            className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#52B788] focus:ring-4 focus:ring-emerald-100 text-sm md:text-xs text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Simple, Ultra-Clean Sheets Grid */}
      {filteredSheets.length > 0 ? (
        <div key={selectedCategory} className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredSheets.map((sheet) => (
            <a
              key={sheet.id}
              href={sheet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group soft-card p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <IconTile>
                    <FileSpreadsheet className="w-5 h-5" />
                  </IconTile>
                  <span className="text-[11px] font-bold text-slate-400 tabular-nums">
                    {String(OFFICIAL_SHEETS.indexOf(sheet) + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 dir="auto" className="text-base font-bold text-[#0B3C49] mb-1.5">
                  {sheet.titleAr}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {sheet.descriptionEn}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 text-[11px]">
                <span className="text-slate-400 font-medium truncate">
                  {sheet.categoryEn}
                </span>
                <span className="font-semibold text-emerald-700 inline-flex items-center gap-1 shrink-0">
                  Open Sheet
                  <LinkArrow external className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="animate-fadeIn bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <p className="text-sm font-semibold text-slate-600">No documents found</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-2 text-xs text-[#52B788] hover:underline font-semibold"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};
