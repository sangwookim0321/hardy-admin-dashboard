import { useState, useCallback } from 'react';
import apiClient from '@/lib/api-client';
import { AxiosError, AxiosRequestConfig } from 'axios';

interface UseApiOptions<T> extends Omit<AxiosRequestConfig, 'url' | 'method'> {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
}

export function useApi<T = any>(url: string, method: string = 'GET') {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (options: UseApiOptions<T> = {}) => {
    const { onSuccess, onError, ...config } = options;

    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.request<T>({
        url,
        method,
        ...config,
      });

      setData(response.data);
      onSuccess?.(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError);
      onError?.(axiosError);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, method]);

  return {
    data,
    error,
    loading,
    execute,
  };
}
