export type Language = 'ar' | 'en';

export type PageId = 'home' | 'sheets' | 'social';


export interface SheetItem {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'hr-ops' | 'consulting-leads' | 'data-brands';
  categoryAr: string;
  categoryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  url: string;
  fileType: 'Google Sheets' | 'PDF';
  requiresGoogleAuth: boolean;
  isVerified: boolean;
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
