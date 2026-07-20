export interface Role {
  id: string
  name: string
  description: string | null
  permissions: string[]
}

export interface Permission {
  id: string
  name: string
  module: string
}
