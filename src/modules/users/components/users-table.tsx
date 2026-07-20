import { useMemo } from 'react'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Users as UsersIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EmptyState } from '@/components/data/empty-state'
import { ErrorState } from '@/components/data/error-state'
import { useUsers } from '@/modules/users/hooks/use-users'
import { getUsersColumns } from '@/modules/users/components/users-columns'
import { USERS_PAGE_SIZE } from '@/modules/users/constants/pagination'
import type { User } from '@/modules/users/types/user'

interface UsersTableProps {
  page: number
  onPageChange: (page: number) => void
  onCreate: () => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export function UsersTable({ page, onPageChange, onCreate, onEdit, onDelete }: UsersTableProps) {
  const { data, isPending, isError, isPlaceholderData, refetch } = useUsers(page, USERS_PAGE_SIZE)
  const columns = useMemo(() => getUsersColumns({ onEdit, onDelete }), [onEdit, onDelete])

  const table = useReactTable({
    data: data?.items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isPending) {
    return <Skeleton className="h-64 w-full" />
  }

  if (isError) {
    return <ErrorState description="Could not load users." onRetry={() => refetch()} />
  }

  if (!data || data.items.length === 0) {
    return (
      <EmptyState
        icon={UsersIcon}
        title="No users yet"
        description="Create your first internal user to get started."
        actionLabel="New user"
        onAction={onCreate}
      />
    )
  }

  const totalPages = Math.max(1, Math.ceil(data.total / data.limit))

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Page {data.page} of {totalPages} · {data.total} users
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1 || isPlaceholderData}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages || isPlaceholderData}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
