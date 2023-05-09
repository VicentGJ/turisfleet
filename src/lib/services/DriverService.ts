import BaseService from "./BaseService";
import type { DriverCreate, DriverUpdate } from "../types/DriverTypes";
export default class DriverService extends BaseService {
  protected static instance: DriverService;

  private constructor() {
    super();
    this.service = "/driver";
  }

  public static getInstance(): DriverService {
    if (!DriverService.instance) return new DriverService();
    return DriverService.instance;
  }

  public async getDrivers(limit: number | "ALL" = 200): Promise<any> {
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

  public async createDriver(driver: DriverCreate): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(), {
        method: "POST",
        body: JSON.stringify(driver),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async getDriver(id_number: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(id_number), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async deleteDriver(driverID: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(driverID), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async updateDriver(
    driverID: string,
    driver: DriverUpdate
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(driverID), {
        method: "PUT",
        body: JSON.stringify(driver),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async getDriverCar(driverID: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(driverID + "/car"), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async updateDriverCar(
    id_driver: string,
    id_car: string | null
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(id_driver + "/car"), {
        method: "PUT",
        body: JSON.stringify({ id_car }),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async removeDriverCar(id_driver: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(id_driver + "/car"), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
