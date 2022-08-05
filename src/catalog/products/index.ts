import { PaginatedResponse, PaginationRequest, ResourceRequest, Visibility } from '../../types.js';
import { Product, ProductsPricesRange, ProductVariantPriceCalculationResult } from './types.js';
import { getStoreUrl, usePaginationRequestWrapper, useRequestWrapper } from '../../api.js';
import { AxiosInstance } from 'axios';

export * from './types.js';

export interface ProductsPaginationRequest extends PaginationRequest {
  category_id?: string;
  features?: object[];
  f?: object;
  city_id?: string;
  collection_id?: string;
  group_id?: string;
  context_id?: string;
  context_type?: string;
  min_price?: string | number;
  max_price?: string | number;
  visibility?: Visibility;
  featured_categores?: boolean;
  promotion_reward?: boolean;
}

export interface ProductRequest extends ResourceRequest {
  city_id?: string;
}

export interface ProductVariantModifierRequest {
  modifier_id: string;
  modifiers_group_id?: string | null;
  quantity: number;
}

export async function getProducts(params: ProductsPaginationRequest = {}): Promise<PaginatedResponse<Product>> {
  return usePaginationRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, '/products'), { params });
  });
}

export async function getProduct(id: string, params: ProductRequest = {}): Promise<Product> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, `/products/${id}`), { params });
  });
}

export async function getProductVariantPrice(
  productId: string,
  variantId: string,
  modifiers: ProductVariantModifierRequest[],
  params: ProductRequest = {},
): Promise<ProductVariantPriceCalculationResult> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.post(
      getStoreUrl(storeId, `/products/${productId}/variants/${variantId}/price`),
      { modifiers },
      { params },
    );
  });
}

export async function getProductsPricesRange(categoryId: string | null): Promise<ProductsPricesRange> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    const params: any = {};

    if (categoryId) {
      params.category_id = categoryId;
    }

    return axios.get(getStoreUrl(storeId, '/products/prices'), { params });
  });
}
