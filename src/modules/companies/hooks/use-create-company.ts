import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { companiesService } from '@/modules/companies/services/companies.service'
import { companiesKeys } from '@/modules/companies/constants/query-keys'
import { getApiErrorMessage } from '@/utils/get-api-error-message'

export function useCreateCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: companiesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companiesKeys.lists() })
      toast.success('Company created')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to create company'))
    },
  })
}
