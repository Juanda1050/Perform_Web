import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { usersService } from '@/modules/users/services/users.service'
import { usersKeys } from '@/modules/users/constants/query-keys'
import { getApiErrorMessage } from '@/utils/get-api-error-message'
import type { UpdateUserRequest } from '@/modules/users/types/user'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserRequest }) =>
      usersService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() })
      toast.success('User updated')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to update user'))
    },
  })
}
