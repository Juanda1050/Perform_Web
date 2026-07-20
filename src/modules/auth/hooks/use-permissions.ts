import { useCurrentUserProfile } from '@/modules/auth/hooks/use-current-user-profile'

export function usePermissions() {
  const { data: profile, isPending } = useCurrentUserProfile()
  const permissions = profile?.role?.permissions ?? []

  return {
    permissions,
    isPending,
    hasPermission: (permission: string) => permissions.includes(permission),
  }
}
