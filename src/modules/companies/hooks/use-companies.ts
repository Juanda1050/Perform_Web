import { useQuery } from '@tanstack/react-query'
import { companiesService } from '@/modules/companies/services/companies.service'
import { companiesKeys } from '@/modules/companies/constants/query-keys'

export function useCompanies() {
  return useQuery({
    queryKey: companiesKeys.lists(),
    queryFn: companiesService.list,
  })
}
