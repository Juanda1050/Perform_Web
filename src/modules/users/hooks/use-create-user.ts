import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { usersService } from '@/modules/users/services/users.service'
import { usersKeys } from '@/modules/users/constants/query-keys'
import { getApiErrorMessage } from '@/utils/get-api-error-message'

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: usersService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() })
      toast.success('User created')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to create user'))
    },
  })
}
