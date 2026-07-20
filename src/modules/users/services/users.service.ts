import { apiClient } from '@/api/client'
import type { ApiSuccess } from '@/types/api'
import type {
  CreateUserRequest,
  CurrentUserProfile,
  PaginatedUsers,
  UpdateUserRequest,
  User,
} from '@/modules/users/types/user'

export const usersService = {
  async getMe(): Promise<CurrentUserProfile> {
    const { data } = await apiClient.get<ApiSuccess<CurrentUserProfile>>('/users/me')
    return data.data
  },

  async list(page: number, limit: number): Promise<PaginatedUsers> {
    const { data } = await apiClient.get<ApiSuccess<PaginatedUsers>>('/users', {
      params: { page, limit },
    })
    return data.data
  },

  async getById(id: string): Promise<User> {
    const { data } = await apiClient.get<ApiSuccess<User>>(`/users/${id}`)
    return data.data
  },

  async create(payload: CreateUserRequest): Promise<User> {
    const { data } = await apiClient.post<ApiSuccess<User>>('/users', payload)
    return data.data
  },

  async update(id: string, payload: UpdateUserRequest): Promise<User> {
    const { data } = await apiClient.patch<ApiSuccess<User>>(`/users/${id}`, payload)
    return data.data
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`)
  },
}
