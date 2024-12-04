import { useState, useCallback } from 'react';
import apiClient from '@/lib/api/api-client';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { supabase } from '@/lib/supabase/supabase';

interface UseApiOptions<T> extends Omit<AxiosRequestConfig, 'url' | 'method'> {
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
}

interface UseAuthenticatedApiOptions {
  url: string;
  options?: RequestInit;
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

  const fetchWithAuth = useCallback(async ({ url, options }: UseAuthenticatedApiOptions) => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) throw error
      
      if (!session) {
        throw new Error('인증되지 않은 요청입니다.')
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          ...options?.headers,
          'Authorization': `Bearer ${session.access_token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '서버 오류가 발생했습니다.')
      }

      return response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }, []);

  return {
    data,
    error,
    loading,
    execute,
    fetchWithAuth,
  };
}
