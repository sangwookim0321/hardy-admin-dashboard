import { api } from '../axios-config'

interface VerifyResponse {
  success: boolean
  data?: {
    id: string
    email: string
    role: string
    [key: string]: any
  }
  message?: string
  error?: string
  status: number
}

export const verifyApi = {
  verify: async (): Promise<VerifyResponse> => {
    const response = await api.get<VerifyResponse>('/api/auth/verify')
    const { data, status } = response
    return { ...data, status }
  },
}

export default verifyApi