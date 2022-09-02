import { AxiosInstance } from 'axios';

export interface ZenkyAxios {
  storeId: string;
  axios: AxiosInstance;
}

export interface ZenkyError {
  message: string;
  original_message: string;
  error_code: string;
  http_code: number;
  meta?: any;
}

export interface Enum {
  id: string;
  name: string;
  [x: string]: any;
}

export interface Phone {
  country: string;
  e164: string;
  international: string;
  national: string;
}

export interface DateTime {
  date: string;
  datetime: string;
  datetime_at: string;
  datetime_utc: string;
  diff: string;
  iso: string;
  iso_utc: string;
  timestamp: number;
  timezone: string;
}

export interface Currency {
  code: string;
  decimals_separator: string;
  name: string;
  prefix: string | null;
  suffix: string | null;
  symbol: string;
  thousands_separator: string;
}

export interface Price {
  currency: Currency;
  full: string;
  short: string;
  trimmed: string;
  value: number;
}

export interface Percentage {
  value: number;
  percentage: number;
}

export interface Discountable {
  discount_id: string | null;
  has_discount: boolean;
  discount_difference: Price | null;
  discount_percentage: Percentage | null;
}

export interface ResourceRequest {
  with?: string;
  [x: string]: any;
}

export interface PaginationRequest extends ResourceRequest {
  page?: number;
  count?: number;
  order_by?: string;
  search?: string;
}

export interface Pagination {
  count: number;
  current_page: number;
  elements: {
    active: boolean;
    page?: number;
    type: string;
  }[];
  has_next_page: boolean;
  has_previous_page: boolean;
  links: {
    next?: string;
    previous?: string;
  };
  per_page: number;
  total: number;
  total_pages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}

export enum Visibility {
  Visible = 'visible',
  Hidden = 'hidden',
  All = 'all',
}

export enum Publication {
  Published = 'published',
  Unpublished = 'unpublished',
  All = 'all',
}

export enum ConfirmationMethod {
  Sms = 'sms',
  Call = 'call',
}
