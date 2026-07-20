import { apiClient } from '@/api/client'
import type { ApiSuccess } from '@/types/api'
import type {
  Company,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from '@/modules/companies/types/company'

export const companiesService = {
  async list(): Promise<Company[]> {
    const { data } = await apiClient.get<ApiSuccess<Company[]>>('/companies')
    return data.data
  },

  async getById(id: string): Promise<Company> {
    const { data } = await apiClient.get<ApiSuccess<Company>>(`/companies/${id}`)
    return data.data
  },

  async create(payload: CreateCompanyRequest): Promise<Company> {
    const { data } = await apiClient.post<ApiSuccess<Company>>('/companies', payload)
    return data.data
  },

  async update(id: string, payload: UpdateCompanyRequest): Promise<Company> {
    const { data } = await apiClient.patch<ApiSuccess<Company>>(`/companies/${id}`, payload)
    return data.data
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/companies/${id}`)
  },
}
