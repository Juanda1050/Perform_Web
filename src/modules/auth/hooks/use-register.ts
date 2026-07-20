import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authService } from '@/modules/auth/services/auth.service'
import { useAuthStore } from '@/store/auth-store'
import type { RegisterRequest } from '@/modules/auth/types/auth'

export function useRegister() {
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: (payload: RegisterRequest) => authService.register(payload),
    onSuccess: ({ outcome, user }) => {
      if (outcome === 'signed-in') {
        setUser(user)
        toast.success('Account created')
      } else {
        toast.success('Check your email to confirm your account')
      }
    },
    onError: () => {
      toast.error('Could not create account')
    },
  })
}
