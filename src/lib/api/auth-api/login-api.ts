import { api } from '../axios-config'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  data?: {
    id: string
    email: string
    role: string
    [key: string]: any
  }
  status: number
  error?: string
}

export const loginApi = {
  login: async (params: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/auth/login', params)
    const { data, status } = response
    return { ...data, status }
  },
}

export default loginApi
