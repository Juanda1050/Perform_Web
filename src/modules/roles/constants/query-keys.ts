export const rolesKeys = {
  all: ['roles'] as const,
  lists: () => [...rolesKeys.all, 'list'] as const,
  permissions: () => [...rolesKeys.all, 'permissions'] as const,
}
