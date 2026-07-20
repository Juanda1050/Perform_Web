export { companiesService } from '@/modules/companies/services/companies.service'
export { useCompanies } from '@/modules/companies/hooks/use-companies'
export { useCreateCompany } from '@/modules/companies/hooks/use-create-company'
export { useUpdateCompany } from '@/modules/companies/hooks/use-update-company'
export { useDeleteCompany } from '@/modules/companies/hooks/use-delete-company'
export type {
  Company,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from '@/modules/companies/types/company'
