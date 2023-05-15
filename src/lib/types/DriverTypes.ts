export interface Driver {
  id_driver: number;
  id_number: string;
  name: string;
  address: string;
  category: LicenceCategory;
  idcar: number;
}

export interface DriverCreate {
  id_number: string;
  name: string;
  address: string;
  category: LicenceCategory;
}
export interface DriverUpdate {
  id_number: string;
  id_car: string;
  name: string;
  address: string;
  category: LicenceCategory;
}

export enum LicenceCategory {
  A1 = "A1",
  A = "A",
  B = "B",
  C1 = "C1",
  C = "C",
  D1 = "D1",
  D = "D",
  E = "E",
  F = "F",
  FE = "FE",
}
