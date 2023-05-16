import BaseService from "./BaseService";
import type { CarCreate, CarUpdate, Car } from "../types/CarTypes";
export default class CarService extends BaseService {
  protected static instance: CarService;

  private constructor() {
    super();
    this.service = "/car";
  }

  public static getInstance(): CarService {
    if (!CarService.instance) return new CarService();
    return CarService.instance;
  }

  public async getCars(limit: number | "ALL" = "ALL"): Promise<Car[]> {
    const queryParams = this.makeParams({ limit });
    return await this.handleReq(undefined, queryParams, "GET");
  }

  public async createCar(car: CarCreate): Promise<Car> {
    return await this.handleReq(undefined, undefined, "POST", car);
  }

  public async getCar(plate: string | number): Promise<Car> {
    return await this.handleReq(this.url(plate.toString()), undefined, "GET");
  }

  public async deleteCar(plate: string | number): Promise<any> {
    return await this.handleReq(
      this.url(plate.toString()),
      undefined,
      "DELETE"
    );
  }

  public async updateCar(plate: string, car: CarUpdate): Promise<Car> {
    return await this.handleReq(this.url(plate), undefined, "PUT", car);
  }
}
