import { z } from 'zod'

export const companySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  logoUrl: z.union([z.string().url('Enter a valid URL'), z.literal('')]).optional(),
})

export type CompanyFormValues = z.infer<typeof companySchema>
