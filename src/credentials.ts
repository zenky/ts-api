import { AxiosInstance } from 'axios';
import { ZenkyAxios } from './types.js';

let currentStoreId: string | null = null;
let currentInstance: AxiosInstance | null = null;

export function setInstance(storeId: string, instance: AxiosInstance) {
  currentStoreId = storeId;
  currentInstance = instance;
}

export function getInstance(): ZenkyAxios  {
  if (currentStoreId === null || currentInstance === null) {
    throw new Error('You must configure axios with useAxios() first!');
  }

  return {
    storeId: currentStoreId,
    axios: currentInstance,
  };
}
