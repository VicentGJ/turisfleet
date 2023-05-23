import { popup } from '$stores/basic_stores'
import type { DriverCategory, LicenseCategory } from '../types/CategoryTypes'
import type {
  Driver,
  DriverCreate,
  DriverUpdate,
  DriverWithCategory,
} from '../types/DriverTypes'
import BaseService from './BaseService'
export default class DriverService extends BaseService {
  protected static instance: DriverService

  private constructor() {
    super()
    this.service = '/driver'
  }

  public static getInstance(): DriverService {
    if (!DriverService.instance) return new DriverService()
    return DriverService.instance
  }

  public async getDrivers(limit: number | 'ALL' = 'ALL'): Promise<Driver[]> {
    const queryParams = this.makeParams({ limit })
    return await this.handleReq(undefined, queryParams, 'GET')
  }

  public async createDriver(driver: DriverCreate): Promise<Driver> {
    return await this.handleReq(undefined, undefined, 'POST', driver)
  }
  public async getDriver(id_driver: number): Promise<Driver> {
    return await this.handleReq(
      this.url(id_driver.toString()),
      undefined,
      'GET'
    )
  }

  public async deleteDriver(id_driver: number): Promise<any> {
    return await this.handleReq(
      this.url(id_driver.toString()),
      undefined,
      'DELETE'
    )
  }

  public async updateDriver(
    id_driver: number,
    driver: DriverUpdate
  ): Promise<Driver> {
    return await this.handleReq(
      this.url(id_driver.toString()),
      undefined,
      'PUT',
      driver
    )
  }
  public async setDriverCategories(
    id_driver: number,
    categories: LicenseCategory[]
  ): Promise<void> {
    return await this.handleReq(
      this.url(id_driver.toString() + '/license'),
      undefined,
      'PUT',
      categories
    )
  }
  public async getDriverCategories(
    id_driver: number
  ): Promise<LicenseCategory[]> {
    return new Promise<LicenseCategory[]>((resolve, reject) => {
      let categories: LicenseCategory[] = []
      this.handleReq(
        this.url(id_driver.toString() + '/license'),
        undefined,
        'GET'
      ).then((data: DriverCategory[]) => {
        data.forEach(
          (dc) =>
            (categories = [...categories, dc.license_category_category_name])
        )
        resolve(categories)
      })
    })
  }
  public async deleteDriverCategories(id_driver: number): Promise<void> {
    return await this.handleReq(
      this.url(id_driver.toString() + '/license'),
      undefined,
      'DELETE'
    )
  }

  public async getDriversWithCategories(): Promise<DriverWithCategory[]> {
    let data = await this.handleReq(this.url('license'), undefined, 'GET')
    let result: DriverWithCategory[] = []
    if (data) {
      let map = new Map()
      return new Promise<DriverWithCategory[]>((resolve, reject) => {
        data.forEach((item: any) => {
          if (map.has(item.id_driver)) {
            let index = map.get(item.id_driver)
            let categories = result[index].categories
            result[index].categories = [
              item.license_category_category_name,
              ...categories,
            ]
          } else {
            let newItem: DriverWithCategory = {
              id_driver: item.id_driver,
              id_number: item.id_number,
              name: item.name,
              address: item.address,
              categories: [item.license_category_category_name],
            }
            result.push(newItem)
            map.set(item.id_driver, result.length - 1)
          }
        })
        resolve(result)
      })
    } else return result
  }
}
