import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { companiesService } from '@/modules/companies/services/companies.service'
import { companiesKeys } from '@/modules/companies/constants/query-keys'
import { getApiErrorMessage } from '@/utils/get-api-error-message'

export function useDeleteCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: companiesService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companiesKeys.lists() })
      toast.success('Company deleted')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to delete company'))
    },
  })
}
