export interface SituationCreate {
  situation_name: string;
  situation_type: string;
}
export interface SituationUpdate {
  situation_name: string;
  situation_type: string;
}

export interface CarSituationCreate {
  car_id_car: string | number;
  situation_id_situation: string | number;
  date: Date | string;
  return_date: Date | null;
}

export interface CarSituationID {
  car_id_car: string | number;
  date: Date | string;
}

export interface DriverSituationCreate {
  driver_id_driver: string | number;
  situation_id_situation: string | number;
  date: Date | string;
  return_date: Date | null;
}

export interface DriverSituationID {
  driver_id_driver: string | number;
  date: Date | string;
}
