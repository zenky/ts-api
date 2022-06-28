import { DateTime } from '../types.js';
import { getStoreUrl, usePlainRequestWrapper, useRequestWrapper } from '../api.js';
import { AxiosInstance } from 'axios';

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface Address {
  id: string;
  resolver: string;
  name: string | null;
  country: {
    code: string | null;
    name: string | null;
  } | null;
  city: {
    short: string | null;
    full: string | null;
  } | null;
  settlement: string | null;
  street: {
    short: string | null;
    full: string | null;
  } | null;
  house: string | null;
  block: string | null;
  address: string | null;
  coordinates: GeoLocation | null;
  apartment: string | null;
  entrance: string | null;
  floor: string | null;
  has_intercom: boolean;
  intercom_code: string | null;
  created_at: DateTime | null;
  updated_at: DateTime | null;
}

export interface AddressSuggestionsRequest {
  query: string;
  city_id: string;
}

export interface AddressSuggestions {
  provider: string;
  suggestions: object[];
}

export interface AddressRequest {
  name?: string | null;
  city?: string | null;
  street?: string | null;
  house?: string | null;
  block?: string | null;
  address?: string | null;
  apartment?: string | null;
  entrance?: string | null;
  floor?: string | null;
  has_intercom?: boolean;
  intercom_code?: string | null;
}

export interface UpdateAddressRequest {
  delivery_address: AddressRequest,
}

export async function getAddressSuggestions(payload: AddressSuggestionsRequest): Promise<AddressSuggestions> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post('/v2/suggestions/address', payload);
  });
}

export async function updateAddress(id: string, request: UpdateAddressRequest): Promise<Address> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.put(getStoreUrl(storeId, `/me/addresses/${id}`), request);
  });
}

export async function deleteAddress(id: string): Promise<void> {
  return usePlainRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    await axios.delete(getStoreUrl(storeId, `/me/addresses/${id}`));
  });
}
