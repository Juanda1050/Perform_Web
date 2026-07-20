import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { User } from '@/modules/users/types/user'

interface UsersColumnsOptions {
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export function getUsersColumns({ onEdit, onDelete }: UsersColumnsOptions): ColumnDef<User>[] {
  return [
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name ?? '—'}</span>
          <span className="text-muted-foreground text-xs">{row.original.email}</span>
        </div>
      ),
    },
    {
      id: 'company',
      header: 'Company',
      cell: ({ row }) => row.original.company?.name ?? '—',
    },
    {
      id: 'role',
      header: 'Role',
      cell: ({ row }) =>
        row.original.role ? <Badge variant="secondary">{row.original.role.name}</Badge> : '—',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.status === 'ACTIVE' ? 'default' : 'secondary'}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="hover:bg-muted inline-flex size-8 items-center justify-center rounded-md"
              aria-label={`Actions for ${row.original.email}`}
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(row.original)}>
                <Pencil className="size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => onDelete(row.original)}>
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]
}
