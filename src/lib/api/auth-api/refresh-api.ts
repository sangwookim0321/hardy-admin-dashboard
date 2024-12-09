import { api } from '../axios-config'

interface RefreshResponse {
  success: boolean
  message?: string
  error?: string
  status: number
}

export const refreshApi = {
  refresh: async (): Promise<RefreshResponse> => {
    const response = await api.post<RefreshResponse>('/api/auth/refresh')
    const { data, status } = response
    return { ...data, status }
  },
}

export default refreshApi
