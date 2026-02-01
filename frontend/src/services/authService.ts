import api from './api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
  }
}

export interface User {
  id: number
  name: string
  email: string
}

export interface InviteData {
  code: string
}

export interface InviteValidationResponse {
  valid: boolean
  email?: string
  name?: string
  message: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials)
    return response.data
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  async register(data: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/register', data)
    return response.data
  },

  async registerWithInvite(data: {
    code: string
    name: string
    password: string
    password_confirmation: string
  }): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/register/invite', data)
    return response.data
  },

  async validateInviteCode(code: string): Promise<InviteValidationResponse> {
    const response = await api.post<InviteValidationResponse>('/auth/invites/validate', { code })
    return response.data
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/auth/me')
    return response.data
  },

  async refreshToken(): Promise<string> {
    const response = await api.post<{ token: string }>('/auth/refresh')
    return response.data.token
  },
}
