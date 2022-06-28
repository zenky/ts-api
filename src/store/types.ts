import { Currency, DateTime, Enum, Phone, Price } from '../types.js';
import { Address, GeoLocation } from '../addresses/index.js';
import { Medium } from '../media/index.js';

export interface Contact {
  id: string;
  type: Enum;
  value: string | Phone;
  phone_country?: string;
}

export interface DeliveryZone {
  id: string;
  store_id: string;
  city_id: string;
  stock_id: string;
  visible: boolean;
  active: boolean;
  name: string | null;
  coordinates: GeoLocation[];
  area: number | null;
  description: string | null;
  color: string | null;
  min_price: Price | null;
  free_delivery_price: Price | null;
  delivery_price: Price | null;
  delivery_time: string | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
}

export interface ScheduleDay {
  open: boolean;
  day: string;
  name: string;
  hours: string[];
}

export interface ScheduleCurrentDay extends ScheduleDay {
  open: boolean;
  next_open_at: {
    datetime: DateTime;
    short: string;
    days: number;
  };
  closing_at: DateTime | null;
}

export interface Schedule {
  today: ScheduleCurrentDay;
  days: ScheduleDay[];
}

export interface Stock {
  id: string;
  store_id: string;
  visible: boolean;
  name: string | null;
  display_name: string | null;
  description: string | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  delivery_zones?: DeliveryZone[];
  media?: Medium[];
  schedule?: Schedule;
  contacts?: Contact[];
  address?: Address | null;
}

export interface City {
  id: string;
  store_id: string;
  name: string;
  timezone: string | null;
  center: GeoLocation | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  stocks?: Stock[];
  delivery_zones?: DeliveryZone[];
  settings?: {
    default_stock_id: string | null;
    orders: {
      off_hours_submission_enabled: boolean;
    };
    addresses: {
      restrict_suggestions: boolean;
      search_radius: number | null;
    };
  };
  schedule?: Schedule;
  contacts?: Contact[];
}

export interface StoreLoyaltySettings {
  enabled: boolean;
  bonuses: {
    adjustment_enabled: boolean;
    pin_enabled: boolean;
  };
  cashback: {
    enabled: boolean;
  };
  payments: {
    enabled: boolean;
  };
  referral_program: {
    enabled: boolean;
  };
}

export interface StoreSettings {
  locale: {
    country: {
      code: string;
      name: string;
      iso3166: {
        name: string;
        alpha2: string;
        alpha3: string;
        numeric: string;
        currency: string[];
      };
    };
    currency: {
      code: string;
      data: Currency;
    };
  };
  orders: {
    authentication_method: Enum;
  };
  addresses: {
    resolver: Enum;
  };
  cities: {
    default_id: string | null;
  };
  loyalty: StoreLoyaltySettings;
  price_types: {
    default_id: string | null;
  };
  applications: {
    app_store: {
      id: string;
      url: string;
    } | null;
    google_play: {
      id: string;
      url: string;
    } | null;
    sales_channel_id: string | null;
  };
  websites: {
    primary_domain: string | null;
    sales_channel_id: string | null;
  };
  services: {
    recaptcha: {
      enabled: boolean;
      actions: Enum[];
      key: string | null;
    };
  };
  websockets: {
    app_id: string;
    app_key: string;
    options: {
      host: string;
      port: number;
      scheme: string;
      encrypted: boolean;
      useTLS: boolean;
    };
  } | null;
}

export interface Store {
  id: string;
  short_id: string;
  name: string | null;
  slug: string | null;
  app_bundle_id: string | null;
  url: string;
  created_at: string | null;
  updated_at: string | null;
  media?: {
    logo: Medium | null;
    square_logo: Medium | null;
  };
  cities?: City[];
  settings?: StoreSettings;
  contacts?: Contact[];
}
