import React, { useState, useMemo } from 'react';
import { OFFICIAL_SHEETS } from '../data/portalData';
import {
  FileSpreadsheet,
  Search,
  ArrowUpRight,
  X
} from 'lucide-react';

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
        item.titleEn.toLowerCase().includes(q) ||
        item.descriptionEn.toLowerCase().includes(q) ||
        item.categoryEn.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left">
      {/* Clean Minimal Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3C49] tracking-tight">
          Sheets & Documents
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Click any document to open directly in Google Sheets.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 order-2 sm:order-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#0B3C49] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative order-1 sm:order-2 w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sheets..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-slate-200 focus:border-[#52B788] text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSheets.map((sheet) => (
            <a
              key={sheet.id}
              href={sheet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-[#52B788] hover:shadow-card-hover transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#52B788] flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-[#0B3C49] group-hover:text-emerald-400 transition-colors">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#52B788] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h3 className="text-base font-bold text-[#0B3C49] group-hover:text-[#114B5F] transition-colors mb-1.5">
                  {sheet.titleEn}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {sheet.descriptionEn}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px]">
                <span className="text-slate-400 font-medium">
                  {sheet.categoryEn}
                </span>
                <span className="font-semibold text-emerald-700 group-hover:underline inline-flex items-center gap-0.5">
                  Open Sheet ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
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
