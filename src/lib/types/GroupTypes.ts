export interface Group {
  id_group: number
  country: string
  tourist_amount: number
}

export interface GroupCreate {
  country: string
  tourist_amount: number
}
export interface GroupUpdate {
  country: string
  tourist_amount: number
}
