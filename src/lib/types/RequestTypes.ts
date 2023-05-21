export interface Request {
  id_request: number
  id_group: number
  id_car: number
  id_copilot: number
  id_specific_program: number
  date: Date | string
  return_date: Date | string
}

export interface RequestCreate {
  id_group: number
  id_specific_program: number
  start_date: Date | string
}
export interface RequestUpdate {
  id_car: number
  id_copilot: number
  date: Date | string
  id_specific_program: number
}
