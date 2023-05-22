import BaseService from './BaseService'
import type { CarCreate, CarUpdate, Car } from '../types/CarTypes'
import type {
  Report1Type,
  Report2Type,
  Report3Type,
  Report4Type,
  Report5Type,
  Report6Type,
  Report7Type,
  Report8Type,
  Report9Type,
} from '../types/ReportTypes'
import dayjs from 'dayjs'
import { errorMessage } from '../stores/basic_stores'
export default class ReportService extends BaseService {
  protected static instance: ReportService

  private constructor() {
    super()
    this.service = '/reports'
  }

  public static getInstance(): ReportService {
    if (!ReportService.instance) return new ReportService()
    return ReportService.instance
  }

  public async report1(): Promise<Report1Type[]> {
    return new Promise<Report1Type[]>(async (resolve, reject) => {
      let data = await this.handleReq(this.url('1'), undefined, 'GET').catch(
        (err) => {
          //errorMessage.update(() => err.message);
        }
      )
      const result: Report1Type[] = []
      const driverMap = new Map<number, Report1Type>()
      for (const driver of data) {
        if (!driverMap.has(driver.id_driver)) {
          driverMap.set(driver.id_driver, {
            'ID Number': driver.id_number,
            Name: driver.name,
            Address: driver.address,
            Categories: [driver.license_category_category_name],
            Cars: driver.plate_number ? [driver.plate_number] : [],
          })
        } else {
          const existingDriver = driverMap.get(driver.id_driver)
          if (
            !existingDriver?.Categories.includes(
              driver.license_category_category_name
            )
          ) {
            existingDriver?.Categories.push(
              driver.license_category_category_name
            )
          }
          if (
            driver.plate_number &&
            !existingDriver?.Cars.includes(driver.plate_number)
          ) {
            existingDriver?.Cars.push(driver.plate_number)
          }
        }
      }

      for (const driver of driverMap.values()) {
        if (driver.Cars.length !== 1) {
          driver.Cars = []
        } else {
          driver.Cars = [driver.Cars[0]]
        }
        result.push(driver)
      }

      resolve(result)
    })
  }
  public async report2(): Promise<Report2Type[]> {
    let data = await this.handleReq(this.url('2'), undefined, 'GET').catch(
      (err) => {
        //errorMessage.update(() => err.message);
      }
    )
    let result: Report2Type[] = []
    if (!data) return result
    else
      return new Promise<Report2Type[]>((resolve, reject) => {
        data.forEach((data: any) => {
          result = [
            ...result,
            {
              'Plate Number': data.plate_number,
              Brand: data.brand,
              'Seat Amount': data.seat_amount,
              'Available KM': data.available_km,
            },
          ]
        })
        resolve(result)
      })
  }
  public async report3(date: Date): Promise<Report3Type[]> {
    const params = this.makeParams({
      date: dayjs(date).format('MMM DD, YYYY'),
    })
    return await this.handleReq(this.url('3'), params, 'GET').catch((err) => {
      //errorMessage.update(() => err.message);
    })
  }
  public async report4(): Promise<Report4Type[]> {
    return await this.handleReq(this.url('4'), undefined, 'GET').catch(
      (err) => {
        //errorMessage.update(() => err.message);
      }
    )
  }
  public async report5(): Promise<Report5Type[]> {
    return await this.handleReq(this.url('5'), undefined, 'GET').catch(
      (err) => {
        //errorMessage.update(() => err.message);
      }
    )
  }
  public async report6(): Promise<Report6Type[]> {
    return await this.handleReq(this.url('6'), undefined, 'GET').catch(
      (err) => {
        //errorMessage.update(() => err.message);
      }
    ) //TODO: this is uncompleted
  }
  public async report7(): Promise<Report7Type[]> {
    return await this.handleReq(this.url('7'), undefined, 'GET').catch(
      (err) => {
        //errorMessage.update(() => err.message);
      }
    ) //TODO: this is uncompleted
  }
  public async report8(): Promise<Report8Type[]> {
    return await this.handleReq(this.url('8'), undefined, 'GET').catch(
      (err) => {
        //errorMessage.update(() => err.message);
      }
    ) //TODO: this is uncompleted
  }
  public async report9(): Promise<Report9Type[]> {
    return await this.handleReq(this.url('9'), undefined, 'GET').catch(
      (err) => {
        //errorMessage.update(() => err.message);
      }
    ) //TODO: this is uncompleted
  }
}
