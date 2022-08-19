import {
  Order,
  OrderCheckoutBonusesPaymentPreview,
  OrderCheckoutResult,
  OrderCheckoutTotal,
  OrderConfirmationResult,
  OrderPayment,
  OrderPaymentReceipt,
  OrderPaymentsPreview,
  OrderSettings,
  OrderSubmissionResult,
  ResendOrderConfirmationCodeResult,
} from './types.js';
import { getOrderParams, getOrderUrl, usePlainRequestWrapper, useRequestWrapper } from '../api.js';
import { AxiosInstance } from 'axios';
import { ResourceRequest } from '../types.js';
import {
  CreateOrderRequest,
  OrderCheckoutCustomerRequest,
  OrderCheckoutDeliveryRequest,
  OrderCheckoutPaymentsRequest,
  OrderCheckoutRequest,
  OrderConfirmationRequest,
  OrderCredentials,
  OrderCustomerRequest,
  OrderPaymentRequest,
  OrderPaymentsPreviewRequest,
  OrderProductVariantRequest,
  SubmitOrderRequest,
} from './requests.js';

export * from './types.js';
export * from './requests.js';

export async function createOrder(request: CreateOrderRequest): Promise<Order> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post('/v2/orders', request);
  });
}

export async function getOrder(credentials: OrderCredentials, params: ResourceRequest = {}): Promise<Order> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.get(getOrderUrl(credentials), {
      params: getOrderParams(credentials, params),
    });
  });
}

export async function getOrderSettings(credentials: OrderCredentials, cityId: string): Promise<OrderSettings>  {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.get(getOrderUrl(credentials, '/settings'), {
      params: getOrderParams(credentials, { city_id: cityId }),
    });
  });
}

export async function getOrderPaymentsPreview(
  credentials: OrderCredentials,
  request: OrderPaymentsPreviewRequest,
): Promise<OrderPaymentsPreview> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post(getOrderUrl(credentials, '/payments/preview'), request, {
      params: getOrderParams(credentials),
    });
  });
}

export async function getOrderPaymentTransactionReceipt(
  credentials: OrderCredentials,
  paymentId: string,
): Promise<OrderPaymentReceipt> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.get(getOrderUrl(credentials, `/payments/${paymentId}/receipt`), {
      params: getOrderParams(credentials),
    });
  });
}

export async function getPendingOrderPayment(
  credentials: OrderCredentials,
  request: OrderPaymentRequest,
): Promise<OrderPayment> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post(getOrderUrl(credentials, '/payments/pending'), request, {
      params: getOrderParams(credentials),
    });
  });
}

export async function addOrderProductVariant(
  credentials: OrderCredentials,
  request: OrderProductVariantRequest,
  params: ResourceRequest = {},
): Promise<Order>  {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post(getOrderUrl(credentials, '/products'), request, {
      params: getOrderParams(credentials, params),
    });
  });
}

export async function removeOrderProductVariant(
  credentials: OrderCredentials,
  request: OrderProductVariantRequest,
  params: ResourceRequest = {},
): Promise<Order> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post(getOrderUrl(credentials, '/products/remove'), request, {
      params: getOrderParams(credentials, params),
    });
  });
}

export async function setOrderCustomer(
  credentials: OrderCredentials,
  request: OrderCustomerRequest,
): Promise<any> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post(getOrderUrl(credentials, '/customer'), request, {
      params: getOrderParams(credentials),
    });
  });
}

export async function submitOrder(
  credentials: OrderCredentials,
  request: SubmitOrderRequest,
): Promise<OrderSubmissionResult>  {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post(getOrderUrl(credentials, '/submit'), request, {
      params: getOrderParams(credentials),
    });
  });
}

export async function setOrderCheckoutCustomer(
  credentials: OrderCredentials,
  request: OrderCheckoutCustomerRequest,
): Promise<void> {
  return usePlainRequestWrapper(async function (axios: AxiosInstance) {
    await axios.post(getOrderUrl(credentials, '/checkout/customer'), request, {
      params: getOrderParams(credentials),
    });
  });
}

export async function setOrderCheckoutDelivery(
  credentials: OrderCredentials,
  request: OrderCheckoutDeliveryRequest,
): Promise<Order> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post(getOrderUrl(credentials, '/checkout/delivery'), request, {
      params: getOrderParams(credentials),
    });
  });
}

export async function setOrderCheckoutPayment(
  credentials: OrderCredentials,
  request: OrderCheckoutPaymentsRequest,
): Promise<OrderPayment[]> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post(getOrderUrl(credentials, '/checkout/payments'), request, {
      params: getOrderParams(credentials),
    });
  });
}

export async function getOrderCheckoutTotal(
  credentials: OrderCredentials,
): Promise<OrderCheckoutTotal> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.get(getOrderUrl(credentials, '/checkout/total'), {
      params: getOrderParams(credentials),
    });
  });
}

export async function getOrderBonusesPaymentPreview(
  credentials: OrderCredentials,
  amount: string | number,
): Promise<OrderCheckoutBonusesPaymentPreview> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.get(getOrderUrl(credentials, '/checkout/payments/bonuses'), {
      params: getOrderParams(credentials, { amount }),
    });
  });
}

export async function checkoutOrder(
  credentials: OrderCredentials,
  request: OrderCheckoutRequest,
): Promise<OrderCheckoutResult> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post(getOrderUrl(credentials, '/checkout'), request, {
      params: getOrderParams(credentials),
    });
  });
}

export async function confirmOrder(
  credentials: OrderCredentials,
  request: OrderConfirmationRequest,
): Promise<OrderConfirmationResult> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post(getOrderUrl(credentials, '/confirm'), request, {
      params: getOrderParams(credentials),
    });
  });
}


export async function resendOrderConfirmationCode(
  credentials: OrderCredentials,
): Promise<ResendOrderConfirmationCodeResult> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post(getOrderUrl(credentials, '/confirm/resend'), {}, {
      params: getOrderParams(credentials),
    });
  });
}
