import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { companySchema, type CompanyFormValues } from '@/modules/companies/schemas/company-schema'
import { useCreateCompany } from '@/modules/companies/hooks/use-create-company'
import { useUpdateCompany } from '@/modules/companies/hooks/use-update-company'
import type { Company } from '@/modules/companies/types/company'

interface CompanyFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  company?: Company
}

export function CompanyFormDialog({ open, onOpenChange, company }: CompanyFormDialogProps) {
  const isEditing = !!company
  const createCompany = useCreateCompany()
  const updateCompany = useUpdateCompany()
  const isPending = createCompany.isPending || updateCompany.isPending

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: { name: '', logoUrl: '' },
  })

  useEffect(() => {
    if (open) {
      reset({ name: company?.name ?? '', logoUrl: company?.logoUrl ?? '' })
    }
  }, [open, company, reset])

  const onSubmit = handleSubmit((values) => {
    const payload = { name: values.name, logoUrl: values.logoUrl || undefined }

    if (isEditing) {
      updateCompany.mutate({ id: company.id, payload }, { onSuccess: () => onOpenChange(false) })
    } else {
      createCompany.mutate(payload, {
        onSuccess: () => onOpenChange(false),
      })
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit company' : 'New company'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the company details below.'
              : 'Create a new tenant company for the platform.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" aria-invalid={!!errors.name} {...register('name')} />
            {errors.name ? (
              <p className="text-destructive text-sm" role="alert">
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="logoUrl">Logo URL</Label>
            <Input
              id="logoUrl"
              placeholder="https://example.com/logo.png"
              aria-invalid={!!errors.logoUrl}
              {...register('logoUrl')}
            />
            {errors.logoUrl ? (
              <p className="text-destructive text-sm" role="alert">
                {errors.logoUrl.message}
              </p>
            ) : null}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving…' : isEditing ? 'Save changes' : 'Create company'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
