export interface ProgramCreate {
  name: string;
}

export interface ProgramUpdate {
  name: string;
}

export interface SpecificProgramCreate {
  id_program: string | number;
  description: string;
  start: Date | string;
  duration: string; //interval
  km: number;
}

export interface SpecificProgramUpdate {
  id_program: string | number;
  description: string;
  start: Date | string;
  duration: string; //interval
  km: number;
}
