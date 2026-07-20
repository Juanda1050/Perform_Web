import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authService } from '@/modules/auth/services/auth.service'
import { useAuthStore } from '@/store/auth-store'
import type { LoginRequest } from '@/modules/auth/types/auth'

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: (payload: LoginRequest) => authService.login(payload),
    onSuccess: (user) => {
      setUser(user)
      toast.success('Signed in successfully')
    },
    onError: () => {
      toast.error('Invalid email or password')
    },
  })
}
