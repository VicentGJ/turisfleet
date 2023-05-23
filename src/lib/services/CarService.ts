import BaseService from './BaseService'
import type { CarCreate, CarUpdate, Car } from '../types/CarTypes'
import type { Driver } from '../types/DriverTypes'
import { popup } from '$stores/basic_stores'
export default class CarService extends BaseService {
  protected static instance: CarService

  private constructor() {
    super()
    this.service = '/car'
  }

  public static getInstance(): CarService {
    if (!CarService.instance) return new CarService()
    return CarService.instance
  }

  public async getCars(limit: number | 'ALL' = 'ALL'): Promise<Car[]> {
    const queryParams = this.makeParams({ limit })
    return await this.handleReq(undefined, queryParams, 'GET')
  }

  public async createCar(car: CarCreate): Promise<Car> {
    return await this.handleReq(undefined, undefined, 'POST', car)
  }

  public async getCar(id_car: number): Promise<Car> {
    return await this.handleReq(this.url(id_car.toString()), undefined, 'GET')
  }

  public async deleteCar(id_car: number): Promise<any> {
    return await this.handleReq(
      this.url(id_car.toString()),
      undefined,
      'DELETE'
    )
  }

  public async updateCar(id_car: number, car: CarUpdate): Promise<Car> {
    return await this.handleReq(
      this.url(id_car.toString()),
      undefined,
      'PUT',
      car
    )
  }

  public async getCarDriver(id_car: number): Promise<Driver> {
    return await this.handleReq(
      this.url(id_car.toString() + '/driver'),
      undefined,
      'GET'
    )
  }
}
