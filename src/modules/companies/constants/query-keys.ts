export const companiesKeys = {
  all: ['companies'] as const,
  lists: () => [...companiesKeys.all, 'list'] as const,
  detail: (id: string) => [...companiesKeys.all, 'detail', id] as const,
}
