import {
  LayoutDashboard,
  Users,
  Building2,
  Network,
  Target,
  Gauge,
  ListChecks,
  FileBarChart,
  Mail,
  ShieldCheck,
  Settings,
  type LucideIcon,
} from 'lucide-react'
import { ROUTES } from '@/config/routes'

export interface NavItem {
  title: string
  url: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', url: ROUTES.dashboard, icon: LayoutDashboard },
  { title: 'Companies', url: ROUTES.companies, icon: Building2 },
  { title: 'Departments', url: ROUTES.departments, icon: Network },
  { title: 'Employees', url: ROUTES.employees, icon: Users },
  { title: 'Objectives', url: ROUTES.objectives, icon: Target },
  { title: 'KPIs', url: ROUTES.kpis, icon: Gauge },
  { title: 'Results', url: ROUTES.results, icon: ListChecks },
  { title: 'Reports', url: ROUTES.reports, icon: FileBarChart },
  { title: 'Invitations', url: ROUTES.invitations, icon: Mail },
  { title: 'Audit', url: ROUTES.audit, icon: ShieldCheck },
  { title: 'Users', url: ROUTES.users, icon: Users },
  { title: 'Settings', url: ROUTES.settings, icon: Settings },
]
