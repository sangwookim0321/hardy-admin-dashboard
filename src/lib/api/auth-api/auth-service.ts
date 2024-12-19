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

interface LogoutResponse {
  success: boolean
  status: number
  error?: string
}

interface RefreshResponse {
  success: boolean
  message?: string
  error?: string
  status: number
}

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

class AuthService {
  private readonly BASE_URL = '/api/auth'

  // 로그인
  async login(params: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(`${this.BASE_URL}/login`, params)
    const { data, status } = response
    return { ...data, status }
  }

  // 로그아웃
  async logout(): Promise<LogoutResponse> {
    const response = await api.post<LogoutResponse>(`${this.BASE_URL}/logout`)
    const { data, status } = response
    return { ...data, status }
  }

  // 리프레시 토큰
  async refresh(): Promise<RefreshResponse> {
    const response = await api.post<RefreshResponse>(`${this.BASE_URL}/refresh`)
    const { data, status } = response
    return { ...data, status }
  }

  // 인증 체크
  async verify(): Promise<VerifyResponse> {
    const response = await api.get<VerifyResponse>(`${this.BASE_URL}/verify`)
    const { data, status } = response
    return { ...data, status }
  }
}

export const authService = new AuthService()
