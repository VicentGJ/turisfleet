export interface Program {
  id_program: number
  program_name: string
}
export interface SpecificProgram {
  id_specific_program: number
  id_program: number
  description: string
  start: Date
  duration: Object | string
  km: number
}

export interface ProgramCreate {
  name: string
}

export interface ProgramUpdate {
  name: string
}

export interface SpecificProgramCreate {
  id_program: string | number
  description: string
  start: Date | string
  duration: string //interval
  km: number
}

export interface SpecificProgramUpdate {
  id_program: string | number
  description: string
  start: Date | string
  duration: string //interval
  km: number
}
