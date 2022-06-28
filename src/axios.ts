import axios from 'axios';
import { setInstance, getInstance } from './credentials.js';
import { ZenkyAxios } from './types.js';

export function createAxios(baseURL: string, storeId: string, client?: string, version?: string, headers = {}) {
  const instance = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      'X-Zenky-Client': client || 'api',
      'X-Zenky-Version': version || 'not_specified',
      'X-Store-Id': storeId,
      ...headers,
    },
  });

  setInstance(storeId, instance);

  return instance;
}

export function setAxiosToken(token?: string) {
  const { axios: instance } = getInstance();

  if (!token) {
    delete instance.defaults.headers.common.Authorization;
  } else {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export const useAxios = (): ZenkyAxios => getInstance();
