export type CarCreate = {
  plate_number: string;
  brand: string;
  seat_amount: number;
  available_km: number;
};

export type CarUpdate = {
  plate_number: string;
  seat_amount: number;
  available_km: number;
};
