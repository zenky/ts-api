import { DateTime, Enum, PaginatedResponse, PaginationRequest, ResourceRequest, Visibility } from '../types.js';
import { Medium } from '../media/index.js';
import { getStoreUrl, usePaginationRequestWrapper, useRequestWrapper } from '../api.js';
import { AxiosInstance } from 'axios';

export interface Category {
  id: string;
  store_id: string;
  short_id: string;
  visible: boolean;
  featured: boolean;
  slug: string | null;
  name: string | null;
  description: string | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  media?: {
    cover: Medium | null;
  };
  settings?: {
    loyalty_modes: Enum[];
  } | null;
}

export interface NestedCategory extends Category {
  children: NestedCategory[];
}

export interface NestedCategoriesRequest {
  visibility?: Visibility;
  with?: string;
}

export async function getCategories(params: PaginationRequest = {}): Promise<PaginatedResponse<Category>> {
  return usePaginationRequestWrapper(async function (axios: AxiosInstance, storeId: string)  {
    return axios.get(getStoreUrl(storeId, '/categories'), { params });
  });
}

export async function getCategory(id: string, params: ResourceRequest = {}): Promise<Category | null>  {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, `/categories/${id}`), { params });
  });
}

export async function getCategoriesTree(params: NestedCategoriesRequest = {}): Promise<NestedCategory[]> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, '/categories/tree'), { params });
  });
}
