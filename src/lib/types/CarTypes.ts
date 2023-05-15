export interface CarCreate {
  plate_number: string;
  brand: string;
  seat_amount: number;
  available_km: number;
}

export interface CarUpdate {
  plate_number: string;
  seat_amount: number;
  available_km: number;
}
