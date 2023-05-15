import BaseService from "./BaseService";
import type {
  Program,
  ProgramCreate,
  ProgramUpdate,
  SpecificProgram,
  SpecificProgramCreate,
  SpecificProgramUpdate,
} from "../types/ProgramTypes";
export default class ProgramService extends BaseService {
  protected static instance: ProgramService;

  private constructor() {
    super();
    this.service = "/program";
  }

  public static getInstance(): ProgramService {
    if (!ProgramService.instance) return new ProgramService();
    return ProgramService.instance;
  }

  public async getPrograms(limit: number | "ALL" = "ALL"): Promise<Program[]> {
    return new Promise<any>((resolve, reject) => {
      const queryParams = this.makeParams({ limit });
      fetch(this.url(queryParams), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async createProgram(program: ProgramCreate): Promise<Program> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(), {
        method: "POST",
        body: JSON.stringify(program),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async getProgram(id: string | number): Promise<Program> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(id.toString()), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async deleteProgram(id: string | number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(id.toString()), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async updateProgram(
    id: string | number,
    program: ProgramUpdate
  ): Promise<Program> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(id.toString()), {
        method: "PUT",
        body: JSON.stringify(program),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  //specific programs
  public async getSpecificPrograms(
    limit: number | "ALL" = "ALL"
  ): Promise<SpecificProgram[]> {
    return new Promise<any>((resolve, reject) => {
      const queryParams = this.makeParams({ limit });
      fetch(this.url("specific" + queryParams), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async createSpecificProgram(
    program: SpecificProgramCreate
  ): Promise<SpecificProgram> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url("specific"), {
        method: "POST",
        body: JSON.stringify(program),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  public async getSpecificProgram(
    id: string | number
  ): Promise<SpecificProgram> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url("specific/" + id.toString()), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  public async deleteSpecificProgram(id: string | number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url("specific/" + id.toString()), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  public async updateSpecificProgram(
    id: string | number,
    program: SpecificProgramUpdate
  ): Promise<SpecificProgram> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url("specific/" + id.toString()), {
        method: "PUT",
        body: JSON.stringify(program),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
