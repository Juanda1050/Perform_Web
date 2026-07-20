import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { usersService } from '@/modules/users/services/users.service'
import { usersKeys } from '@/modules/users/constants/query-keys'

export function useUsers(page: number, limit: number) {
  return useQuery({
    queryKey: usersKeys.list(page, limit),
    queryFn: () => usersService.list(page, limit),
    placeholderData: keepPreviousData,
  })
}
