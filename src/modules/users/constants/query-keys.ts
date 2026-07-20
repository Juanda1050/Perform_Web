export const usersKeys = {
  all: ['users'] as const,
  lists: () => [...usersKeys.all, 'list'] as const,
  list: (page: number, limit: number) => [...usersKeys.lists(), page, limit] as const,
  detail: (id: string) => [...usersKeys.all, 'detail', id] as const,
}
