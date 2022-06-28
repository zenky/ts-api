import { DateTime, PaginatedResponse, PaginationRequest, ResourceRequest } from '../types.js';
import { Medium } from '../media/index.js';
import { getStoreUrl, usePaginationRequestWrapper, useRequestWrapper } from '../api.js';
import { AxiosInstance } from 'axios';

export interface ArticleCategory {
  id: string;
  store_id: string;
  short_id: string;
  slug: string;
  visible: boolean;
  name: string;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface Article {
  id: string;
  store_id: string;
  short_id: string;
  visible: boolean;
  published: boolean;
  status: string;
  slug: string;
  title: string;
  intro: string | null;
  body: string | null;
  created_at: DateTime;
  updated_at: DateTime;
  category?: ArticleCategory | null;
  media?: {
    cover: Medium | null;
  };
}

export interface ArticleCategoriesPaginationRequest extends PaginationRequest {
  visibility?: string;
}

export interface ArticlesPaginationRequest extends PaginationRequest {
  category_id?: string;
  publication?: string;
  visibility?: string;
}

export async function getArticles(params: ArticlesPaginationRequest = {}): Promise<PaginatedResponse<Article>> {
  return usePaginationRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, '/articles'), { params });
  });
}

export async function getArticle(id: string, params: ResourceRequest = {}): Promise<Article | null> {
  return useRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, `/articles/${id}`), { params });
  });
}

export async function getArticleCategories(params: ArticleCategoriesPaginationRequest = {}): Promise<PaginatedResponse<ArticleCategory>> {
  return usePaginationRequestWrapper(async function (axios: AxiosInstance, storeId: string) {
    return axios.get(getStoreUrl(storeId, '/article-categories'), { params });
  });
}
