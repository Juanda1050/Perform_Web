import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CompaniesTable } from '@/modules/companies/components/companies-table'
import { CompanyFormDialog } from '@/modules/companies/components/company-form-dialog'
import { DeleteCompanyDialog } from '@/modules/companies/components/delete-company-dialog'
import type { Company } from '@/modules/companies/types/company'

export default function CompaniesPage() {
  const [formOpen, setFormOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | undefined>(undefined)
  const [deletingCompany, setDeletingCompany] = useState<Company | null>(null)

  const openCreateForm = () => {
    setEditingCompany(undefined)
    setFormOpen(true)
  }

  const openEditForm = (company: Company) => {
    setEditingCompany(company)
    setFormOpen(true)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Companies</h1>
          <p className="text-muted-foreground text-sm">
            Manage the tenant companies on the platform.
          </p>
        </div>
        <Button onClick={openCreateForm} className="sm:w-auto">
          <Plus className="size-4" />
          New company
        </Button>
      </div>

      <CompaniesTable
        onCreate={openCreateForm}
        onEdit={openEditForm}
        onDelete={setDeletingCompany}
      />

      <CompanyFormDialog open={formOpen} onOpenChange={setFormOpen} company={editingCompany} />
      <DeleteCompanyDialog
        open={!!deletingCompany}
        onOpenChange={(open) => !open && setDeletingCompany(null)}
        company={deletingCompany}
      />
    </div>
  )
}
