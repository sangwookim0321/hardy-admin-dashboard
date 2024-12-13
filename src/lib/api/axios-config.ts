import axios from 'axios'
import { useLoadingStore } from '@/store/ui-store/loading-store'
import { toast } from 'react-hot-toast'
import { refreshApi } from './auth-api/refresh-api'
import { formatSuccessMessage, formatErrorMessage } from '@/utils/format'

// API 기본 URL 설정
const baseURL = process.env.NEXT_PUBLIC_API_URL || ''

// axios 인스턴스 생성
export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: any) => void
}> = []

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve()
    }
  })
  failedQueue = []
}

// 토큰 리프레시 함수
const refreshAccessToken = async (originalRequest: any) => {
  try {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then(() => api.request(originalRequest))
        .catch((err) => Promise.reject(err))
    }

    originalRequest._retry = true
    isRefreshing = true

    const response = await refreshApi.refresh()

    if (!response.success) {
      throw new Error(response.error || 'Refresh Failed')
    }

    isRefreshing = false
    processQueue()
    return api.request(originalRequest)
  } catch (refreshError) {
    isRefreshing = false
    processQueue(refreshError)
    return Promise.reject(refreshError)
  }
}

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    useLoadingStore.getState().setLoading(true)
    return config
  },
  (error) => {
    useLoadingStore.getState().setLoading(false)
    return Promise.reject(error)
  }
)

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    useLoadingStore.getState().setLoading(false)

    if (response.data?.message) {
      const formatttedMessage = formatSuccessMessage(response.data.message)
      toast.success(formatttedMessage)
    }

    return response
  },
  async (error) => {
    useLoadingStore.getState().setLoading(false)

    const originalRequest = error.config

    // 에러 메시지 표시 (모든 에러에 대해 먼저 처리)
    if (error.response?.data?.error) {
      const formattedMessage = formatErrorMessage(error.response.data.error)
      toast.error(formattedMessage !== 'Unknown' ? formattedMessage : error.response.data.error)
    } else {
      toast.error('요청 처리 중 오류가 발생했습니다.')
    }

    // 401 에러이고 재시도하지 않은 요청인 경우 리프레시 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 로그인, 로그아웃 요청인 경우는 리프레시를 시도하지 않고 바로 에러를 반환
      if (originalRequest.url === '/api/auth/login' || originalRequest.url === '/api/auth/logout') {
        return Promise.reject(error)
      }
      return refreshAccessToken(originalRequest)
    }

    return Promise.reject(error)
  }
)

export default api
