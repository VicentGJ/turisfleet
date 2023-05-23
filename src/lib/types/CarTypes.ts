import type { LicenseCategory } from './CategoryTypes'

export interface Car {
  id_car: number
  plate_number: string
  brand: string
  seat_amount: number
  available_km: number
  id_driver: number
  id_category: LicenseCategory
}

export interface CarCreate {
  plate_number: string
  brand: string
  seat_amount: number
  available_km: number
  id_driver: number
  id_category: LicenseCategory
}

export interface CarUpdate {
  // plate_number: string
  // seat_amount: number
  // available_km: number
  id_driver: number
}
