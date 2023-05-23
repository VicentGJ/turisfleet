export interface LoginType {
  username: string
  password: string
}
export interface LoggedInTransition {
  id_user: number
  id_role: number
  username: string
}
export interface LoggedInType {
  id_user: number
  role_name: 'administrator' | 'driver' | 'agent' | 'support' | ''
  id_role: number
  username: string
}
