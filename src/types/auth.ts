export type UserRole = 'super_admin' | 'company_admin' | 'manager' | 'employee' | 'guest'

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}
