import { useQuery } from '@tanstack/react-query'
import { rolesService } from '@/modules/roles/services/roles.service'
import { rolesKeys } from '@/modules/roles/constants/query-keys'

export function useRoles() {
  return useQuery({
    queryKey: rolesKeys.lists(),
    queryFn: rolesService.list,
  })
}
