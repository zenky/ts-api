import { DateTime, Price } from '../types.js';

export interface Modifier {
  id: string;
  store_id: string;
  modifiers_group_id: string | null;
  name: string | null;
  display_name: string | null;
  price: Price | null;
  sku: string | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
}

export interface ModifiersGroup {
  id: string;
  store_id: string;
  name: string | null;
  display_name: string | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  modifiers?: Modifier[];
}

export interface ProductModifier {
  modifier: Modifier;
  min_quantity: number;
  max_quantity: number;
  is_required: boolean;
}

export interface ProductModifiersGroup {
  group: ModifiersGroup;
  modifiers: ProductModifier[];
  min_quantity: number;
  max_quantity: number;
  is_required: boolean;
}
