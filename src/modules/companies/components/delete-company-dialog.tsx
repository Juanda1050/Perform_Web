import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useDeleteCompany } from '@/modules/companies/hooks/use-delete-company'
import type { Company } from '@/modules/companies/types/company'

interface DeleteCompanyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  company: Company | null
}

export function DeleteCompanyDialog({ open, onOpenChange, company }: DeleteCompanyDialogProps) {
  const deleteCompany = useDeleteCompany()

  const handleDelete = () => {
    if (!company) return
    deleteCompany.mutate(company.id, { onSuccess: () => onOpenChange(false) })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete company</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <strong>{company?.name}</strong>. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteCompany.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteCompany.isPending}
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteCompany.isPending ? 'Deleting…' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
