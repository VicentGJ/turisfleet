export interface Request {
  id_request: number;
  id_group: number;
  id_car: number;
  id_driver: number;
  id_copilot: number;
  id_specific_program: number;
  date: Date;
  return_date: Date;
}

export interface RequestCreate {
  id_group: string | number;
  id_program: string | number;
  start_date: Date | string;
}
export interface RequestUpdate {
  id_car: string | number;
  id_driver: string | number;
  id_copilot: string | number;
}
