import BaseService from "./BaseService";
import type { DriverCreate, DriverUpdate, Driver } from "../types/DriverTypes";
import type { Car } from "../types/CarTypes";
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

  public async getDrivers(limit: number | "ALL" = "ALL"): Promise<Driver[]> {
    const queryParams = this.makeParams({ limit });
    return await this.handleReq(undefined, queryParams, "GET");
  }

  public async createDriver(driver: DriverCreate): Promise<Driver> {
    return await this.handleReq(undefined, undefined, "POST", driver);
  }

  public async getDriver(id_number: string): Promise<Driver> {
    return await this.handleReq(this.url(id_number), undefined, "GET");
  }

  public async deleteDriver(driverID: string): Promise<any> {
    return await this.handleReq(this.url(driverID), undefined, "DELETE");
  }

  public async updateDriver(
    driverID: string,
    driver: DriverUpdate
  ): Promise<Driver> {
    return await this.handleReq(this.url(driverID), undefined, "PUT", driver);
  }

  public async getDriverCar(driverID: string): Promise<Car> {
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
  ): Promise<Driver> {
    return await this.handleReq(this.url(id_driver + "/car"), undefined, "PUT", { id_car });
  }

  public async removeDriverCar(id_driver: string): Promise<Driver> {
    return await this.handleReq(this.url(id_driver + "/car"), undefined, "DELETE");
  }
}
