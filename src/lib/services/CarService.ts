import BaseService from "./BaseService";
import type { CarCreate, CarUpdate } from "../types/CarTypes";
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

  public async getCars(limit: number | "ALL" = 200): Promise<any> {
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

  public async createCar(car: CarCreate): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(), {
        method: "POST",
        body: JSON.stringify(car),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async getCar(plate: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(plate), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async deleteCar(carID: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(carID), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async updateCar(plate: string, car: CarUpdate): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(plate), {
        method: "PUT",
        body: JSON.stringify(car),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
