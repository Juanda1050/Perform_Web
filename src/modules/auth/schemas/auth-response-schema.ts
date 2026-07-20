import { z } from 'zod'

export const userRoleSchema = z.enum([
  'super_admin',
  'company_admin',
  'manager',
  'employee',
  'guest',
])

export const authUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: userRoleSchema,
})

export const authTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export const loginResponseSchema = z.object({
  user: authUserSchema,
  tokens: authTokensSchema,
})
