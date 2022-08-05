import { DateTime, PaginationRequest, Visibility } from '../types.js';
import { City } from '../store/index.js';

export enum OffersCityMode {
  Strict = 'strict',
  Default = 'default',
}

export interface OfferBanner {
  title: string | null;
  description: string | null;
  image: MediaImage | null;
}

export interface OfferBannersList {
  desktop: OfferBanner;
  mobile: OfferBanner;
}

export interface OfferArticle {
  title: string | null;
  intro: string | null;
  body: string | null;
  cover: MediaImage | null;
}

export interface Offer {
  id: string;
  store_id: string;
  short_id: string;
  slug: string;
  visible: boolean;
  sorting: number;
  created_at: DateTime;
  updated_at: DateTime;
  banners?: OfferBannersList;
  article?: OfferArticle;
  city?: City | null;
}

export interface OffersPaginationRequest extends PaginationRequest {
  city_id?: string;
  city_mode?: OffersCityMode;
  visibility?: Visibility;
}
