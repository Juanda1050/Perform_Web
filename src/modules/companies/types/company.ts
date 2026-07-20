export interface Company {
  id: string
  name: string
  logoUrl: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateCompanyRequest {
  name: string
  logoUrl?: string
}

export type UpdateCompanyRequest = Partial<CreateCompanyRequest>
