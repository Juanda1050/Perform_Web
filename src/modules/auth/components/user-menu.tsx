import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ROUTES } from '@/config/routes'
import { useCurrentUser } from '@/modules/auth/hooks/use-current-user'
import { useCurrentUserProfile } from '@/modules/auth/hooks/use-current-user-profile'
import { useLogout } from '@/modules/auth/hooks/use-logout'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function UserMenu() {
  const navigate = useNavigate()
  const user = useCurrentUser()
  const { data: profile } = useCurrentUserProfile()
  const logout = useLogout()

  const label = user?.fullName ?? user?.email ?? 'Account'
  const roleAndCompany = [profile?.role?.name, profile?.company?.name].filter(Boolean).join(' · ')

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSettled: () => navigate(ROUTES.login, { replace: true }),
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full" aria-label="Open user menu">
        <Avatar className="size-8">
          <AvatarFallback>{user ? getInitials(label) : '…'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{label}</span>
              {roleAndCompany ? (
                <span className="text-muted-foreground text-xs font-normal">{roleAndCompany}</span>
              ) : null}
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} disabled={logout.isPending}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
