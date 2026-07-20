import { useQuery } from '@tanstack/react-query'
import { usersService } from '@/modules/users/services/users.service'
import { authKeys } from '@/modules/auth/constants/query-keys'
import { useAuthStore } from '@/store/auth-store'

export function useCurrentUserProfile() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: authKeys.profile,
    queryFn: usersService.getMe,
    enabled: isAuthenticated,
  })
}
