import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UsersTable } from '@/modules/users/components/users-table'
import { UserFormDialog } from '@/modules/users/components/user-form-dialog'
import { DeleteUserDialog } from '@/modules/users/components/delete-user-dialog'
import type { User } from '@/modules/users/types/user'

export default function UsersPage() {
  const [page, setPage] = useState(1)
  const [formOpen, setFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)

  const openCreateForm = () => {
    setEditingUser(undefined)
    setFormOpen(true)
  }

  const openEditForm = (user: User) => {
    setEditingUser(user)
    setFormOpen(true)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Users</h1>
          <p className="text-muted-foreground text-sm">Manage internal users across companies.</p>
        </div>
        <Button onClick={openCreateForm} className="sm:w-auto">
          <Plus className="size-4" />
          New user
        </Button>
      </div>

      <UsersTable
        page={page}
        onPageChange={setPage}
        onCreate={openCreateForm}
        onEdit={openEditForm}
        onDelete={setDeletingUser}
      />

      <UserFormDialog open={formOpen} onOpenChange={setFormOpen} user={editingUser} />
      <DeleteUserDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        user={deletingUser}
      />
    </div>
  )
}
