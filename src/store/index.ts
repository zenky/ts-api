import { Store } from './types.js';
import { getStoreUrl, useRequestWrapper } from '../api.js';
import { AxiosInstance } from 'axios';

export * from './types.js';

export async function getStore(inclusions: string | null = null): Promise<Store | null>  {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId), {
      params: inclusions ? { with: inclusions } : {},
    });
  });
}
