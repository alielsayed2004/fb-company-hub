import React from 'react';
import { OFFICIAL_SOCIALS } from '../data/portalData';
import { IconTile, LinkArrow } from '../components/ui';

/* Brand glyphs, drawn with currentColor so they take the shared icon-tile colors. */
export const SocialIcon: React.FC<{ id: string; className?: string }> = ({ id, className = 'w-5 h-5' }) => {
  const paths: Record<string, string> = {
    facebook:
      'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    instagram:
      'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    linkedin:
      'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
    tiktok:
      'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.18 2.09 2.35 2.33.72.16 1.48.09 2.16-.2.83-.34 1.49-1.04 1.79-1.89.24-.62.33-1.3.33-1.98.02-4.75.01-9.51.01-14.26z',
  };
  const d = paths[id];
  if (!d) return null;
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
};

export const SocialMediaPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left">
      <div className="animate-fadeUp">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3C49] tracking-tight">
          Official Social Media
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Direct links to verified F.B Company profiles.
        </p>
      </div>

      <div className="stagger grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {OFFICIAL_SOCIALS.map((soc) => (
          <a
            key={soc.id}
            href={soc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group soft-card p-4 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <IconTile>
                <SocialIcon id={soc.id} />
              </IconTile>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-[#0B3C49] truncate">
                  {soc.name}
                </h2>
                <span className="text-xs text-slate-400 font-mono-code truncate block">
                  {soc.handle}
                </span>
              </div>
            </div>

            <LinkArrow external />
          </a>
        ))}
      </div>
    </div>
  );
};
