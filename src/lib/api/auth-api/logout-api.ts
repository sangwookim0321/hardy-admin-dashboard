import { api } from '../axios-config'

interface LogoutResponse {
  success: boolean
  status: number
  error?: string
}

export const logoutApi = {
  logout: async (): Promise<LogoutResponse> => {
    const response = await api.post<LogoutResponse>('/api/auth/logout')
    const { data, status } = response
    return { ...data, status }
  },
}

export default logoutApi
