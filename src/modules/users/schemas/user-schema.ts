import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  companyId: z.string().min(1, 'Company is required').uuid('Select a valid company'),
  roleId: z.string().min(1, 'Role is required').uuid('Select a valid role'),
  fullName: z.string().optional(),
})

export type UserFormValues = z.infer<typeof userSchema>
