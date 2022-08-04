import { AddressRequest } from '../addresses/index.js';

export interface CreateOrderRequest {
  city_id: string;
}

export interface OrderCredentials {
  id: string;
  token: string;
}

export interface OrderProductVariantRequest {
  product_variant_id: string;
  quantity: number;
  modifiers?: {
    modifier_id: string;
    modifiers_group_id?: string | null;
    quantity: number;
  }[];
}

export interface OrderCustomerRequest {
  customer: {
    id: string;
  };
}

export interface OrderPaymentsPreviewRequest {
  payments: {
    method: string;
    amount: string | number;
    bill?: string | number;
  }[];
}

export interface OrderPaymentRequest {
  method: string;
  amount: number | string;
  bill?: string | number;
  card_token_id?: string;
  save_card?: boolean;
}

export interface SubmitOrderRequest {
  city_id?: string;
  stock_id?: string;
  customer?: {
    id?: string;
    phone?: {
      number: string;
      country: string;
    };
    first_name?: string;
    last_name?: string;
    gender?: string;
    birth_date?: string;
  };
  delivery_method?: string;
  payments?: OrderPaymentRequest[];
  delivery_address?: DeliveryAddressRequest;
  on_premise?: {
    table: string;
  };
  notes?: string | null;
  deliver_at?: string | null;
}

export interface DeliveryAddressRequest extends AddressRequest {
  id?: string;
}
