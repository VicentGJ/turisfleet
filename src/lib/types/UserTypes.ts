export interface User {
  id_user: number
  username: string
  id_role: number
}
export interface UserCreate {
  username: string
  password: string
  id_role: number
}

export interface UserUpdate {
  username: string
}
export interface UserChangePassword {
  password: string
}

export interface Role {
  id_role: number
  role_name: rolename
}

export type rolename = 'administrator' | 'support' | 'driver' | 'agent'
