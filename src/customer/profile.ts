import { Customer, CustomerPaymentMethod } from './types.js';
import { getStoreUrl, usePaginationRequestWrapper, usePlainRequestWrapper, useRequestWrapper } from '../api.js';
import { AxiosInstance } from 'axios';
import { PaginatedResponse, PaginationRequest } from '../types.js';
import { Address } from '../addresses/index.js';
import { Order } from '../orders/index.js';

export async function getCustomerProfile(inclusions: string | null): Promise<Customer | null> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string)  {
    return axios.get(getStoreUrl(storeId, '/me'), {
      params: {
        with: inclusions ? inclusions : undefined,
      },
    });
  });
}

export interface UpdateCustomerRequest {
  first_name?: string;
  last_name?: string;
  gender?: string;
  birth_date?: string;
  email?: string;
  password?: string;
  current_password?: string;
}

export async function updateCustomerProfile(request: UpdateCustomerRequest): Promise<Customer | null> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.put(getStoreUrl(storeId, '/me'), request);
  });
}

export async function getCustomerAddresses(params: PaginationRequest = {}): Promise<PaginatedResponse<Address>>  {
  return usePaginationRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, '/me/addresses'), { params });
  });
}

export async function getCustomerOrders(params: PaginationRequest): Promise<PaginatedResponse<Order>> {
  return usePaginationRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, '/me/orders'), { params });
  });
}

export async function getCustomerPaymentMethods(params: PaginationRequest = {}): Promise<PaginatedResponse<CustomerPaymentMethod>>  {
  return usePaginationRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, '/me/payment-methods'), { params });
  });
}

export async function deleteCustomerPaymentMethod(id: string): Promise<void> {
  return usePlainRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    await axios.delete(getStoreUrl(storeId, `/me/payment-methods/${id}`));
  });
}
