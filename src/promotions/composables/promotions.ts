import { OrderCredentials } from '../../orders/index.js';
import { getOrderParams, getOrderUrl, useRequestWrapper } from '../../api.js';
import { AxiosInstance } from 'axios';
import { OrderPromotionReward } from '../types.js';

export interface OrderPromotionsCheckerResult {
  dispatched: boolean;
}

export async function checkCompletedPromotions(credentials: OrderCredentials): Promise<OrderPromotionsCheckerResult> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.post(getOrderUrl(credentials, '/loyalty/promotions/check'), {}, {
      params: getOrderParams(credentials),
    });
  });
}

export async function getOrderPromotionRewards(credentials: OrderCredentials): Promise<OrderPromotionReward[]> {
  return useRequestWrapper(async function (axios: AxiosInstance) {
    return axios.get(getOrderUrl(credentials, '/loyalty/promotions/rewards'), {
      params: getOrderParams(credentials),
    });
  });
}
