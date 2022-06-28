import { DateTime, Enum, PaginatedResponse, PaginationRequest, ResourceRequest } from '../types.js';
import { Medium } from '../media/index.js';
import { getStoreUrl, usePaginationRequestWrapper, useRequestWrapper } from '../api.js';
import { AxiosInstance } from 'axios';

export interface ProductsCollection {
  id: string;
  store_id: string;
  visible: boolean;
  visible_in_app: boolean;
  selection_type: Enum | null;
  criteria_match: Enum | null;
  sorting: number;
  name: string | null;
  description: string | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  media?: {
    cover: Medium | null;
  };
}

export interface ProductsCollectionsPaginationRequest extends PaginationRequest {
  visibility?: string;
  app_visibility?: string;
}

export async function getProductsCollections(params: ProductsCollectionsPaginationRequest = {}): Promise<PaginatedResponse<ProductsCollection>>  {
  return usePaginationRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, '/products-collections'), { params });
  });
}

export async function getProductsCollection(id: string, params: ResourceRequest = {}): Promise<ProductsCollection | null> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string)  {
    return axios.get(getStoreUrl(storeId, `/products-collections/${id}`), { params });
  });
}
