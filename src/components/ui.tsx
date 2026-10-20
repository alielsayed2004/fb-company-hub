import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

/* One icon tile used everywhere so every icon shares size, shape and colors. */
export const IconTile: React.FC<{ children: React.ReactNode; size?: 'md' | 'lg' }> = ({
  children,
  size = 'md',
}) => (
  <div
    className={`icon-tile ${size === 'lg' ? 'w-11 h-11' : 'w-10 h-10'} rounded-xl flex items-center justify-center shrink-0`}
  >
    {children}
  </div>
);

/* Trailing indicator: arrow-up-right for links that leave the site, arrow-right for in-site navigation. */
export const LinkArrow: React.FC<{ external?: boolean; className?: string }> = ({
  external = false,
  className = 'w-4 h-4',
}) =>
  external ? (
    <ArrowUpRight className={`${className} link-arrow link-arrow-external`} />
  ) : (
    <ArrowRight className={`${className} link-arrow link-arrow-internal`} />
  );
