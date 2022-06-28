import {
  DateTime, Enum, Percentage, Phone, Price,
} from '../types.js';
import { Medium } from '../media/index.js';
import { PaymentMethodBank } from '../orders/index.js';

export interface Gender {
  id: string;
  name: string;
}

export interface BonusesLevel {
  id: string;
  name: string;
  expenses: Price;
  cashback_rate: Percentage;
  payment_rate: Percentage;
  cashier_reward_rate: Percentage;
  created_at: DateTime | null;
  updated_at: DateTime | null;
}

export interface LoyaltyRates {
  cashback: Percentage;
  cashier_reward: Percentage;
  payment: Percentage;
}

export interface ReferralProgram {
  code: string;
  invite_url: string;
  join_url: string;
}

export interface LoyaltyProfile {
  balance?: Price | null;
  bonuses_level?: BonusesLevel | null;
  expenses?: Price | null;
  rates?: LoyaltyRates;
  referral_program: ReferralProgram | null;
}

export interface Customer {
  id: string;
  store_profile_id: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  phone: Phone;
  email: string | null;
  gender: Gender;
  media?: {
    avatar: Medium | null;
  } | null;
  loyalty: LoyaltyProfile | null;
  birth_date: DateTime | null;
  registered_at: DateTime | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
}

export interface CustomerPaymentMethod {
  id: string;
  store_id: string;
  customer_id: string;
  customer_store_profile_id: string;
  acquiring_type: Enum;
  card_type: string | null;
  card_first_six: string | null;
  card_last_four: string | null;
  name: string;
  bank: PaymentMethodBank | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
}
