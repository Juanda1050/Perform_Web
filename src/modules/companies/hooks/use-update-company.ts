import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { companiesService } from '@/modules/companies/services/companies.service'
import { companiesKeys } from '@/modules/companies/constants/query-keys'
import { getApiErrorMessage } from '@/utils/get-api-error-message'
import type { UpdateCompanyRequest } from '@/modules/companies/types/company'

export function useUpdateCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCompanyRequest }) =>
      companiesService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companiesKeys.lists() })
      toast.success('Company updated')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to update company'))
    },
  })
}
