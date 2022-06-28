import { DateTime, Enum, PaginatedResponse, PaginationRequest, ResourceRequest } from '../types.js';
import { getStoreUrl, usePaginationRequestWrapper, useRequestWrapper } from '../api.js';
import { AxiosInstance } from 'axios';

export interface FeatureValue {
  id: string;
  store_id: string;
  alias: string;
  name: string;
  range_value: number | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
}

export interface Feature {
  id: string;
  store_id: string;
  features_group_id: string | null;
  alias: string;
  name: string | null;
  filterable: boolean;
  field_type: Enum;
  range_type: Enum | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  values?: FeatureValue[];
  features_group?: FeaturesGroup | null;
}

export interface FeaturesGroup {
  id: string;
  store_id: string;
  visible: boolean;
  name: string | null;
  description: string | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
  features?: Feature[];
}

export interface FeaturesGroupContainer {
  group: FeaturesGroup;
  features: {
    feature: Feature;
    values: FeatureValue[];
  }[];
}

export interface FeaturesPaginationRequest extends PaginationRequest {
  category_id?: string;
  only_filterable?: boolean;
  features_group_id?: string;
}

export async function getFeatures(params: FeaturesPaginationRequest = {}): Promise<PaginatedResponse<Feature>> {
  return usePaginationRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, '/features'), { params });
  });
}

export async function getFeature(id: string, params: ResourceRequest = {}): Promise<Feature> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, `/features/${id}`), { params });
  });
}

export async function getCategoryFeatures(categoryId: string): Promise<Feature[]> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, `/categories/${categoryId}/features`));
  });
}

export async function getCategoryFeaturesGroups(categoryId: string): Promise<FeaturesGroupContainer[]> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, `/categories/${categoryId}/features-groups`));
  });
}
