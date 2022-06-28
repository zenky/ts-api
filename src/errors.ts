import { AxiosError } from 'axios';
import { ZenkyError } from './types.js';

export function getApiError(e: any): ZenkyError | null {
  if (!(e instanceof AxiosError)) {
    return null;
  } else if (!e.request || !e.response || !e.response.data) {
    return null;
  } else if (!e.response.data.error) {
    return null;
  }

  return e.response.data.error;
}

export function getApiErrorCode(e: any): string | null  {
  const error = getApiError(e);

  if (!error) {
    return null;
  }

  return error.error_code;
}

function getValidationErrorMessage(error: ZenkyError, defaultMessage: string | null = null): string | null {
  if (!error.meta || typeof error.meta.errors !== 'object') {
    return defaultMessage;
  }

  const fields = Object.keys(error.meta.errors);

  if (!fields.length) {
    return defaultMessage;
  }

  const firstField = fields.find((field: string) => Array.isArray(error.meta.errors[field]) && error.meta.errors[field].length > 0);

  return firstField ? error.meta.errors[firstField][0] : defaultMessage;
}

export function getApiErrorMessage(e: any, defaultMessage: string | null = null): string | null {
  const error = getApiError(e);

  if (error === null) {
    return defaultMessage;
  } else if (error.error_code === 'validation') {
    return getValidationErrorMessage(error, defaultMessage);
  } else if (error.message) {
    return error.message;
  }

  return defaultMessage;
}
