import type { Company } from '@/modules/companies/types/company'
import type { Role } from '@/modules/roles/types/role'

export interface UserRole {
  id: string
  name: string
  description: string | null
}

export interface User {
  id: string
  supabaseId: string
  email: string
  name: string | null
  companyId: string | null
  roleId: string | null
  status: string
  createdAt: string
  updatedAt: string
  company?: Company
  role?: UserRole
}

export interface CurrentUserProfile {
  id: string
  supabaseId: string
  email: string
  name: string | null
  companyId: string | null
  roleId: string | null
  status: string
  createdAt: string
  updatedAt: string
  company?: Company
  role: Role | null
}

export interface CreateUserRequest {
  email: string
  companyId: string
  roleId: string
  fullName?: string
}

export type UpdateUserRequest = Partial<CreateUserRequest>

export interface PaginatedUsers {
  items: User[]
  total: number
  page: number
  limit: number
}
