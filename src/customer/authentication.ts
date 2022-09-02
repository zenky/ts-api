import { AxiosInstance } from 'axios';
import { getStoreUrl, useRequestWrapper } from '../api.js';
import { Customer } from './types.js';
import { ConfirmationMethod } from '../types.js';

export interface AuthenticationPhone {
  number: string;
  country: string;
}

export interface AuthenticationStatus {
  registered: boolean;
  confirmed: boolean;
}

export interface AuthenticationResponse {
  token: string;
  customer: Customer;
}

export interface RegistrationResponse {
  confirmation_required: boolean;
  method: ConfirmationMethod;
}

export interface ResendRegistrationCodeResponse {
  confirmation_required: boolean;
  method: ConfirmationMethod;
}

export interface PasswordResetCodeResponse {
  success: boolean;
  method: ConfirmationMethod;
}

export async function getAuthenticationStatus(phone: AuthenticationPhone): Promise<AuthenticationStatus> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.post(getStoreUrl(storeId, '/auth/check'), { phone });
  });
}

export async function login(phone: AuthenticationPhone, password: string): Promise<AuthenticationResponse> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.post(getStoreUrl(storeId, '/auth/login'), { phone, password });
  });
}

export async function register(phone: AuthenticationPhone, password: string): Promise<RegistrationResponse> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.post(getStoreUrl(storeId, '/auth/register'), { phone, password });
  });
}

export async function confirm(phone: AuthenticationPhone, code: string, password: string | null): Promise<AuthenticationResponse> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.post(getStoreUrl(storeId, '/auth/register/confirm'), {
      phone,
      code,
      password: password || undefined,
    });
  });
}

export async function resendConfirmationCode(phone: AuthenticationPhone): Promise<ResendRegistrationCodeResponse> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.post(getStoreUrl(storeId, '/auth/register/resend'), { phone });
  });
}

export async function requestPasswordResetCode(phone: AuthenticationPhone): Promise<PasswordResetCodeResponse> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.post(getStoreUrl(storeId, '/auth/password/request'), { phone });
  });
}

export async function resetPassword(phone: AuthenticationPhone, code: string, password: string): Promise<AuthenticationResponse>  {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.post(getStoreUrl(storeId, '/auth/password/reset'), { phone, code, password });
  });
}
