import { api } from '../axios-config'

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

interface UpdateRoleRequest {
  targetUserId: string
  newRole: string
}

interface UpdateRoleResponse {
  success: boolean
  message?: string
  error?: string
  status: number
}

interface DeleteUserRequest {
  targetUserId: string
}

interface DeleteUserResponse {
  success: boolean
  message?: string
  error?: string
  status: number
}

interface UpdateStatusRequest {
  targetUserId: string
  newStatus: string
}

interface UpdateStatusResponse {
  success: boolean
  message?: string
  error?: string
  status: number
}

interface UpdateUserInfoRequest {
  targetUserId: string
  email: string
  displayName: string
  phone: string
}

interface UpdateUserInfoResponse {
  success: boolean
  message?: string
  error?: string
  status: number
}

interface UserInfoRequest {
  targetUserId: string
}

interface UserInfoResponse {
  success: boolean
  data?: User
  message?: string
  error?: string
  status: number
}

class UsersService {
  private readonly BASE_URL = '/api/users'

  // 유저 목록 조회
  async getUsers(): Promise<UsersResponse> {
    const response = await api.get<UsersResponse>(`${this.BASE_URL}`)
    const { data, status } = response
    return { ...data, status }
  }

  // 유저 생성
  async register(params: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(`${this.BASE_URL}`, params)
    const { data, status } = response
    return { ...data, status }
  }

  // 유저 role 업데이트
  async updateRole(params: UpdateRoleRequest): Promise<UpdateRoleResponse> {
    const { targetUserId, newRole } = params
    const response = await api.patch<UpdateRoleResponse>(`${this.BASE_URL}/${targetUserId}/role`, { newRole })
    const { data, status } = response
    return { ...data, status }
  }

  // 유저 삭제
  async deleteUser(params: DeleteUserRequest): Promise<DeleteUserResponse> {
    const { targetUserId } = params
    const response = await api.delete<DeleteUserResponse>(`${this.BASE_URL}/${targetUserId}`)
    const { data, status } = response
    return { ...data, status }
  }

  // 유저 상태 변경
  async updateStatus(params: UpdateStatusRequest): Promise<UpdateStatusResponse> {
    const { targetUserId, newStatus } = params
    const response = await api.patch<UpdateStatusResponse>(`${this.BASE_URL}/${targetUserId}/status`, { newStatus })
    const { data, status } = response
    return { ...data, status }
  }

  // 사용자 정보 변경
  async updateUserInfo(params: UpdateUserInfoRequest): Promise<UpdateUserInfoResponse> {
    const { targetUserId, email, displayName, phone } = params
    const response = await api.patch<UpdateUserInfoResponse>(`${this.BASE_URL}/${targetUserId}`, {
      email,
      displayName,
      phone,
    })
    const { data, status } = response
    return { ...data, status }
  }

  // 사용자 조회
  async getUserInfo(params: UserInfoRequest): Promise<UserInfoResponse> {
    const { targetUserId } = params
    const response = await api.get<UserInfoResponse>(`${this.BASE_URL}/${targetUserId}`)
    const { data, status } = response
    return { ...data, status }
  }
}

export const usersService = new UsersService()
