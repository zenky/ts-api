import { DateTime, Enum, Price } from '../types.js';

export interface OrderPromotionReward {
  id: string;
  store_id: string;
  order_id: string;
  promotion_id: string;
  promotion_reward_id: string;
  item_id: string | null;
  type: Enum;
  amount: Price | null;
  total_amount: Price | null;
  count: number;
  created_at: DateTime;
  updated_at: DateTime;
}
