import { api } from '../../axios-config'

type Role = 'super_admin' | 'admin' | 'guest'

interface UpdateRoleRequest {
  targetUserId: string
  newRole: Role
}

interface UpdateRoleResponse {
  success: boolean
  message?: string
  error?: string
  status: number
}

export const updateRoleApi = {
  updateRole: async (params: UpdateRoleRequest): Promise<UpdateRoleResponse> => {
    const response = await api.patch<UpdateRoleResponse>('/api/users/update-role', params)
    const { data, status } = response
    return { ...data, status }
  },
}

export default updateRoleApi
