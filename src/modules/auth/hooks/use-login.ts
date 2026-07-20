import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authService } from '@/modules/auth/services/auth.service'
import { authQueryKeys } from '@/modules/auth/constants/query-keys'
import { useAuthStore } from '@/store/auth-store'
import type { LoginRequest } from '@/modules/auth/types/auth'

export function useLogin() {
  const queryClient = useQueryClient()
  const setTokens = useAuthStore((state) => state.setTokens)

  return useMutation({
    mutationFn: (payload: LoginRequest) => authService.login(payload),
    onSuccess: async (data) => {
      setTokens(data.tokens)
      queryClient.setQueryData(authQueryKeys.currentUser, data.user)
      toast.success('Signed in successfully')
    },
    onError: () => {
      toast.error('Invalid email or password')
    },
  })
}
