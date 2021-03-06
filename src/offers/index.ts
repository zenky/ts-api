import { Offer, OffersPaginationRequest } from './types.js';
import { PaginatedResponse, ResourceRequest } from '../types.js';
import { getStoreUrl, usePaginationRequestWrapper, useRequestWrapper } from '../api.js';
import { AxiosInstance } from 'axios';

export * from './types.js';

export async function getOffers(params: OffersPaginationRequest = {}): Promise<PaginatedResponse<Offer>> {
  return usePaginationRequestWrapper<Offer>(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, '/offers'), { params });
  });
}

export async function getOffer(id: string, params: ResourceRequest = {}): Promise<Offer | null> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, `/offers/${id}`), { params });
  });
}
