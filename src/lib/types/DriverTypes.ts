import type { LicenseCategory } from './CategoryTypes'

export interface Driver {
  id_driver: number
  id_number: string
  name: string
  address: string
}
export interface DriverWithCategory {
  id_driver: number
  id_number: string
  name: string
  address: string
  categories: LicenseCategory[]
}
export interface DriverCreate {
  id_number: string
  name: string
  address: string
}
export interface DriverUpdate {
  id_number: string
  name: string
  address: string
}
