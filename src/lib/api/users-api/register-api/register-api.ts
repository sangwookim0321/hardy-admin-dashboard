import { api } from '../../axios-config'

interface RegisterRequest {
  email: string
  password: string
}

interface RegisterResponse {
  success: boolean
  message?: string
  data?: {
    id: string
    email: string
    role: string
    [key: string]: any
  }
  id: string
  email: string
  role: string
  status: number
  error?: string
}

export const registerApi = {
  register: async (params: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/api/users/register', params)
    const { data, status } = response
    return { ...data, status }
  },
}
