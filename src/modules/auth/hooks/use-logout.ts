import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authService } from '@/modules/auth/services/auth.service'
import { useAuthStore } from '@/store/auth-store'

export function useLogout() {
  const queryClient = useQueryClient()
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      setUser(null)
      queryClient.clear()
      toast.success('Signed out')
    },
  })
}
