import { DateTime, Discountable, Enum, Price } from '../../types.js';
import { Category } from '../categories.js';
import { Feature, FeaturesGroup, FeatureValue } from '../features.js';
import { Medium } from '../../media/index.js';
import { VariantOptionValue } from '../variant-options.js';
import { ProductModifier, ProductModifiersGroup } from '../modifiers.js';

export interface Product {
  id: string;
  store_id: string;
  short_id: string | null;
  slug: string | null;
  hidden: boolean;
  promotion_reward: boolean;
  track_inventory: boolean;
  vat_mode: Enum;
  vat: number | null;
  name: string | null;
  description: string | null;
  single_variant: boolean;
  unit_type: Enum;
  weight: {
    grams: number;
    short: string;
    full: string;
  };
  share: {
    url: string;
  } | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  features?: {
    feature: Feature;
    value: FeatureValue;
  }[];
  features_groups?: {
    group: FeaturesGroup | null;
    features: {
      feature: Feature;
      values: FeatureValue[];
    }[];
  }[];
  categories?: Category[];
  variants?: ProductVariant[];
  media?: Medium[];
  settings?: {
    loyalty_modes: Enum[];
  };
  modifiers?: ProductModifier[];
  modifiers_groups?: ProductModifiersGroup[];
}

export interface ProductVariant extends Discountable {
  id: string;
  store_id: string;
  product_id: string;
  name: string | null;
  price: Price;
  original_price: Price | null;
  sku: string | null;
  barcode: string | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  modifiers?: ProductModifier[];
  modifiers_groups?: ProductModifiersGroup[];
  selected_modifiers?: {
    modifiers: {
      modifiers_group_id: string | null;
      modifier_id: string | null;
      quantity: number;
    }[];
    hash: string | null;
  };
  prices?: ProductVariantPrice[];
  option_values?: VariantOptionValue[];
  remainders?: {
    stock_id: string;
    quantity: number;
  }[];
  dimensions?: ProductVariantDimension[];
}

export interface ProductVariantDimension {
  id: string;
  dimension: Enum;
  type: Enum;
  value: number;
  created_at: DateTime | null;
  updated_at: DateTime | null;
}

export interface ProductVariantPrice extends Discountable {
  id: string;
  price_type_id: string;
  stock_id: string | null;
  price: Price;
  original_price: Price | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
}

export interface ProductVariantPriceCalculationResult extends Discountable {
  price: Price;
  original_price: Price | null;
  modifiers_hash: string | null;
}

export interface ProductsPricesRange {
  min: Price | null;
  max: Price | null;
}
