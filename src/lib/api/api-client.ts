import axios from 'axios';
import { useAuthStore } from '@/store/auth/auth-store';
import { supabase } from '../supabase/supabase';
import { toast } from 'react-hot-toast';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  async (config) => {
    const { accessToken, expiresAt, refreshToken } = useAuthStore.getState();
    
    if (!accessToken) {
      return config;
    }

    try {
      // 토큰 만료 확인
      const now = Math.floor(Date.now() / 1000);
      if (expiresAt && now >= expiresAt - 60) {
        // 토큰 리프레시 시도
        const { data: { session }, error } = await supabase.auth.refreshSession({
          refresh_token: refreshToken!
        });

        if (error || !session) {
          throw new Error('Failed to refresh token');
        }

        // 새로운 토큰으로 스토어 업데이트
        useAuthStore.getState().actions.setAuth(
          session.user,
          session.access_token,
          session.refresh_token,
          session.expires_at
        );

        // 새로운 토큰으로 요청 헤더 설정
        config.headers.Authorization = `Bearer ${session.access_token}`;
      } else {
        // 현재 토큰으로 요청 헤더 설정
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      // 토큰 유효성 검증
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);
      if (error || !user) {
        throw new Error('Invalid token');
      }

    } catch (error) {
      // 인증 실패 시 로그아웃 처리
      useAuthStore.getState().actions.clearAuth();
      toast.error('인증이 만료되었습니다. 다시 로그인해 주세요.');
      window.location.href = '/';
      return Promise.reject(error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().actions.clearAuth();
      toast.error('인증이 만료되었습니다. 다시 로그인해 주세요.');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
