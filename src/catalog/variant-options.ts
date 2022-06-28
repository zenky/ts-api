import { DateTime, Enum } from '../types.js';

export interface VariantOption {
  id: string;
  store_id: string;
  name: string | null;
  type: Enum | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  values?: VariantOptionValue[];
}

export interface VariantOptionValue {
  id: string;
  name: string | null;
  color: string | null;
  option?: VariantOption;
}
