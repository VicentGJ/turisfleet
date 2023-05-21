import type { LicenseCategory } from './CategoryTypes'

export interface ReportItemType {
  id: string
  name: string
  click: () => void
}

export interface Report1Type {
  'ID Number': string
  Name: string
  Address: string
  Categories: LicenseCategory[]
  Cars: string[]
}
export interface Report2Type {
  'Plate Number': string
  Brand: string
  'Seat Amount': number
  'Available KM': number
}
export interface Report3Type {
  //TODO
}
export interface Report4Type {
  date: string
  plate_number: string
  situation_name: string
  return_date?: string
}

export interface Report5Type {
  date: string
  name: string
  situation_name: string
  return_date?: string
}

export interface Report6Type {
  id_number: string
  name: string
  plate_number: string
  brand: string
}

export interface Report7Type {
  id_number: string
  name: string
  plate_number: string
  brand: string
}

export interface Report8Type {
  id_number: string
  name: string
  plate_number: string
  brand: string
}

export interface Report9Type {
  id_number: string
  name: string
  plate_number: string
  brand: string
}
