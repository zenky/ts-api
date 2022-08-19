import { DateTime, Discountable, Enum, Price } from '../types.js';
import { Product, ProductVariant } from '../catalog/products/index.js';
import { Customer } from '../customer/index.js';
import { Address } from '../addresses/index.js';
import { City, Stock } from '../store/index.js';

export interface Order extends Discountable {
  id: string;
  city_id: string | null;
  stock_id: string | null;
  order_status_id: string | null;
  number: string | null;
  token: string | null;
  api_client: Enum | null;
  confirmation_status: Enum;
  delivery_method: Enum;
  total_price: Price;
  original_total_price: Price | null;
  notes: string | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  submitted_at: DateTime | null;
  deliver_at: DateTime | null;
  archived_at: DateTime | null;
  meta_data: {
    deliver_at?: string;
    on_premise?: {
      table: string;
    };
  } | null;
  variants?: OrderProductVariant[];
  customer?: Customer | null;
  delivery_addres?: Address | null;
  city?: City | null;
  stock?: Stock | null;
  current_status?: OrderStatusChange | null;
  statuses?: OrderStatusChange[];
  payments?: OrderPayment[];
  statuses_progress?: OrderStatusProgress[];
  deliver_at_local?: DateTime | null;
}

export interface OrderStatus {
  id: string;
  name: string;
  progress_bar_name: string;
  kind: Enum;
  background_color: string | null;
  sorting: number;
  visible: boolean;
  visible_to_cashier: boolean;
  roles: Enum[] | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
}

export interface OrderStatusChange {
  id: string;
  order_status_id: string;
  is_system: boolean;
  created_at: DateTime;
  status?: OrderStatus | null;
}

export interface OrderStatusProgress {
  status_id: string;
  completed_at: DateTime;
  status: OrderStatus;
}

export interface OrderProductVariant extends Discountable {
  uuid: string;
  product_id: string;
  product_variant_id: string;
  stock_id: string | null;
  promotion_id: string | null;
  promotion_reward_id: string | null;
  quantity: number;
  assembled_quantity: number | null;
  total_price: Price;
  original_total_price: Price | null;
  unit_price: Price;
  original_unit_price: Price | null;
  modifiers_hash: string | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  variant?: ProductVariant;
  product?: Product;
  modifiers?: OrderProductVariantModifier[];
}

export interface OrderProductVariantModifier {
  id: string;
  store_id: string;
  order_id: string;
  product_id: string;
  product_variant_id: string;
  modifier_id: string;
  modifiers_group_id: string | null;
  quantity: number;
  total_price: Price;
  unit_price: Price;
  original_price: Price | null;
  original_unit_price: Price | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
}

export interface OrderPayment {
  id: string;
  store_id: string;
  user_id: string | null;
  order_id: string;
  external_id: string | null;
  parent_id: string | null;
  type: Enum;
  status: Enum;
  method: Enum;
  amount: Price;
  confirmed_at: DateTime | null;
  authorization_confirmed_at: DateTime | null;
  cancelled_at: DateTime | null;
  refunded_at: DateTime | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  transaction_meta: {
    change?: Price;
    cloudpayments?: {
      widget: {
        publicId: string;
        description: string;
        amount: number;
        currency: string;
        invoiceId: string | null;
        accountId: string | null;
        skin: string;
      };
      payment_page_url: string;
      charge_type: string;
    };
    charged_as?: string;
  };
}

export interface PaymentMethod extends Enum {
  meta?: {
    payment_page_url: string | null;
  };
  token?: {
    id: string;
    type: string;
    first_six: string;
    last_four: string;
    bank: PaymentMethodBank | null;
  };
}

export interface PaymentMethodBank {
  id: string;
  name: string;
  url: string;
  background_colors: string[];
  primary_background_color: string;
  background_style: string;
  logo_style: string;
  text_color: string;
  logos: {
    png: string | null;
    svg: string | null;
  },
  payment_system: {
    id: string;
    name: string;
    logos: {
      black: string | null;
      white: string | null;
      colored: string | null;
    };
  }
}

export interface OrderPaymentReceipt {
  items: {
    label: string;
    price: number;
    quantity: number;
    amount: number;
    vat: number | null;
    measurementUnit: string;
  }[];
  email: string | null;
  phone: string;
  amounts: {
    electronic: number;
  };
  taxationSystem: number;
}

export interface DeliveryMethod extends Enum {
  min_price: Price | null;
}

export interface OrderSettings {
  payment_methods: PaymentMethod[];
  delivery_methods: DeliveryMethod[];
  options: Enum[];
}

export interface OrderPaymentsPreview {
  total: Price;
  unpaid: Price;
  change: Price;
  cashback: Price;
  max_bonuses_payment: Price;
  payments: {
    method: string;
    amount: Price;
  }[];
}

export interface OrderSubmissionResult {
  result: {
    phone_confirmation_required: boolean;
    confirmation_code_sent: boolean;
    user_signed_up: boolean;
  };
  order: Order;
}

export interface OrderCheckoutTotalPayment {
  id: string;
  method: Enum;
  amount: Price;
}

export interface OrderCheckoutTotal {
  min_price: Price | null;
  subtotal: Price;
  original_subtotal: Price;
  delivery_price: Price | null;
  discount: Price | null;
  total: Price;
  original_total: Price;
  max_bonuses_payment: Price | null;
  cashback: Price | null;
  payments: OrderCheckoutTotalPayment[];
}

export interface OrderCheckoutBonusesPaymentPreview {
  bonuses: Price;
  unpaid: Price;
}

export interface OrderCheckoutResult {
  confirmation_required: boolean;
  online_payment: {
    required: boolean;
    url: string | null;
  };
  order: Order;
}

export interface OrderConfirmationResult {
  success: boolean;
  token: string | null;
}

export interface ResendOrderConfirmationCodeResult {
  success: boolean;
}
