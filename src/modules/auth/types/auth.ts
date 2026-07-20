import type { z } from 'zod'
import type { loginResponseSchema } from '@/modules/auth/schemas/auth-response-schema'

export type LoginResponse = z.infer<typeof loginResponseSchema>

export interface LoginRequest {
  email: string
  password: string
}
