import { apiClient } from '@/api/client'
import type { AuthUser } from '@/types/auth'
import { authUserSchema, loginResponseSchema } from '@/modules/auth/schemas/auth-response-schema'
import type { LoginRequest, LoginResponse } from '@/modules/auth/types/auth'

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await apiClient.post('/auth/login', payload)
    return loginResponseSchema.parse(data)
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },

  async getCurrentUser(): Promise<AuthUser> {
    const { data } = await apiClient.get('/auth/me')
    return authUserSchema.parse(data)
  },
}
