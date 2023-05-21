export enum LicenseCategory {
  A1 = 'A1',
  A = 'A',
  B = 'B',
  C1 = 'C1',
  C = 'C',
  D1 = 'D1',
  D = 'D',
  E = 'E',
  F = 'F',
  FE = 'FE',
}

export interface DriverCategory {
  drivers_id_driver: number
  license_category_category_name: LicenseCategory
}
