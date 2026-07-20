import { apiClient } from '@/api/client'
import type { ApiSuccess } from '@/types/api'
import type { Permission, Role } from '@/modules/roles/types/role'

export const rolesService = {
  async list(): Promise<Role[]> {
    const { data } = await apiClient.get<ApiSuccess<Role[]>>('/roles')
    return data.data
  },

  async listPermissions(): Promise<Permission[]> {
    const { data } = await apiClient.get<ApiSuccess<Permission[]>>('/roles/permissions')
    return data.data
  },
}
