export type Language = 'ar' | 'en';

export type PageId = 'home' | 'sheets' | 'social';


/* Returned by /api/sheets only after the password is accepted; never bundled. */
export interface SheetLink {
  title: string;
  url: string;
}

export interface SocialItem {
  id: string;
  name: string;
  handle: string;
  url: string;
  badgeAr: string;
  badgeEn: string;
  descriptionAr: string;
  descriptionEn: string;
  color: string;
  bgLight: string;
}
