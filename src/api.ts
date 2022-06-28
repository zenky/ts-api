import { AxiosInstance } from 'axios';
import { useAxios } from './axios.js';
import { PaginatedResponse } from './types.js';
import { OrderCredentials } from './orders/index.js';

type RequestCallback = (axios: AxiosInstance, storeId: string) => Promise<any>;

export async function usePlainRequestWrapper(callback: RequestCallback): Promise<any> {
  const { axios, storeId } = useAxios();

  return callback(axios, storeId);
}

export async function useRequestWrapper<T>(callback: RequestCallback): Promise<T>  {
  const { axios, storeId } = useAxios();
  const response = await callback(axios, storeId);

  return response.data.data;
}

export async function usePaginationRequestWrapper<T>(callback: RequestCallback): Promise<PaginatedResponse<T>> {
  const { axios, storeId } = useAxios();
  const response = await callback(axios, storeId);

  return {
    items: response.data.data,
    pagination: response.data.meta.pagination,
  };
}

export function getStoreUrl(storeId: string, path: string = '/'): string  {
  if (path === '/') {
    return `/v3/stores/${storeId}`;
  }

  return `/v3/stores/${storeId}${path}`;
}

export function getOrderUrl(credentials: OrderCredentials, path: string = '/'): string  {
  if (path === '/') {
    return `/v2/orders/${credentials.id}`;
  }

  return `/v2/orders/${credentials.id}${path}`;
}

export const getOrderParams = (credentials: OrderCredentials, params: object = {}): object => ({
  ...params,
  token: credentials.token,
});
