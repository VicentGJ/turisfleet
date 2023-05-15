import BaseService from "./BaseService";
import type {
  CarSituation,
  CarSituationCreate,
  CarSituationID,
  DriverSituation,
  DriverSituationCreate,
  DriverSituationID,
  Situation,
  SituationCreate,
  SituationUpdate,
} from "../types/SituationTypes";
export default class SituationService extends BaseService {
  protected static instance: SituationService;

  private constructor() {
    super();
    this.service = "/situation";
  }

  public static getInstance(): SituationService {
    if (!SituationService.instance) return new SituationService();
    return SituationService.instance;
  }

  public async getSituations(
    limit: number | "ALL" = "ALL",
    situation_type: "any" | "driver" | "car" = "any"
  ): Promise<Situation[]> {
    return new Promise<any>((resolve, reject) => {
      const queryParams = this.makeParams({ limit, situation_type });
      fetch(this.url(queryParams), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async createSituation(situation: SituationCreate): Promise<Situation> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(), {
        method: "POST",
        body: JSON.stringify(situation),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async getSituation(situation_id: string | number): Promise<Situation> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(situation_id.toString()), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async deleteSituation(situation_id: string | number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(situation_id.toString()), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async updateSituation(
    id_situation: string | number,
    situation: SituationUpdate
  ): Promise<Situation> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(id_situation.toString()), {
        method: "PUT",
        body: JSON.stringify(situation),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  //car situations
  public async getCarSituations(
    limit: number | "ALL" = "ALL"
  ): Promise<CarSituation[]> {
    const queryParams = this.makeParams({ limit });

    return new Promise<any>((resolve, reject) => {
      fetch(this.url("cars" + queryParams), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async createCarSituation(
    situation: CarSituationCreate
  ): Promise<CarSituation> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url("cars"), {
        method: "POST",
        body: JSON.stringify(situation),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async deleteCarSituation(id: CarSituationID): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const qp = this.makeParams(id);
      fetch(this.url("cars" + qp), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  //driver situations
  public async getDriverSituations(
    limit: number | "ALL" = "ALL"
  ): Promise<DriverSituation[]> {
    const queryParams = this.makeParams({ limit });

    return new Promise<any>((resolve, reject) => {
      fetch(this.url("drivers" + queryParams), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  public async createDriverSituation(
    situation: DriverSituationCreate
  ): Promise<DriverSituation> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url("drivers"), {
        method: "POST",
        body: JSON.stringify(situation),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  public async deleteDriverSituation(id: DriverSituationID): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const qp = this.makeParams(id);
      fetch(this.url("drivers" + qp), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
