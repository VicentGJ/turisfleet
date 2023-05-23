export interface Situation {
  id_situation: number
  situation_name: string
  situation_type: 'C' | 'D' | 'CD'
}
export interface CarSituation {
  car_id_car: number
  situation_id_situation: number
  date: Date
  return_date: Date
}

export interface DriverSituation {
  driver_id_driver: number
  situation_id_situation: number
  date: Date
  return_date: Date
}

export interface SituationCreate {
  situation_name: string
  situation_type: 'C' | 'D' | 'CD'
}
export interface SituationUpdate {
  situation_name: string
  situation_type: 'C' | 'D' | 'CD'
}

export interface CarSituationCreate {
  car_id_car: number
  situation_id_situation: number
  date: Date | string
  return_date: Date | null
}
export interface CarSituationUpdate {
  car_id_car: number
  situation_id_situation: number
  date: Date | string
  return_date: Date | null
}

export interface CarSituationID {
  car_id_car: number
  date: Date | string
}

export interface DriverSituationCreate {
  driver_id_driver: number
  situation_id_situation: number
  date: Date | string
  return_date: Date | null
}
export interface DriverSituationUpdate {
  driver_id_driver: number
  situation_id_situation: number
  date: Date | string
  return_date: Date | null
}

export interface DriverSituationID {
  driver_id_driver: number
  date: Date | string
}
