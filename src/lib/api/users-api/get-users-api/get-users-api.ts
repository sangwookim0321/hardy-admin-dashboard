import { api } from '../../axios-config'

interface User {
  id: string
  email: string
  role: string
  created_at: string
  updated_at: string
  [key: string]: any
}

interface UsersResponse {
  success: boolean
  data?: User[]
  message?: string
  error?: string
  status: number
}

export const getUsersApi = {
  getUsers: async (): Promise<UsersResponse> => {
    const response = await api.get<UsersResponse>('/api/users/get-users')
    const { data, status } = response
    return { ...data, status }
  },
}

export default getUsersApi
