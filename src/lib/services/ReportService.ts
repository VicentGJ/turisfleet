import dayjs from 'dayjs'
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
import BaseService from './BaseService'
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
  //TODO PARSE DATA
  public async report1(): Promise<Report1Type[]> {
    return new Promise<Report1Type[]>(async (resolve, reject) => {
      let data = await this.handleReq(this.url('1'), undefined, 'GET')
      // resolve(data)
      const result: Report1Type[] = []
      let drivers: any = {}
      data.forEach((driver: any) => {
        if (drivers[driver['Driver ID']]) {
          if (!drivers[driver['Driver ID']]['Car'].includes(driver['Car'])) {
            drivers[driver['Driver ID']]['Car'].push(driver['Car'])
          }
          if (
            !drivers[driver['Driver ID']]['Category'].includes(
              driver['Category']
            )
          ) {
            drivers[driver['Driver ID']]['Category'].push(driver['Category'])
          }
        } else {
          drivers[driver['Driver ID']] = {
            ...driver,
            Car: [driver['Car']],
            Category: [driver['Category']],
          }
          result.push(drivers[driver['Driver ID']])
        }
      })
      console.log(result)
      resolve(result)
    })
  }
  public async report2(): Promise<Report2Type[]> {
    let data = await this.handleReq(this.url('2'), undefined, 'GET')
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
    return await this.handleReq(this.url('3'), params, 'GET')
  }
  public async report4(): Promise<Report4Type[]> {
    return await this.handleReq(this.url('4'), undefined, 'GET')
  }
  public async report5(): Promise<Report5Type[]> {
    return await this.handleReq(this.url('5'), undefined, 'GET')
  }
  public async report6(): Promise<Report6Type[]> {
    return await this.handleReq(this.url('6'), undefined, 'GET')
  }
  public async report7(id_request: number): Promise<Report7Type[]> {
    return await this.handleReq(
      this.url('7'),
      this.makeParams({ id_request }),
      'GET'
    )
  }
  public async report8(): Promise<Report8Type[]> {
    return await this.handleReq(this.url('8'), undefined, 'GET') //TODO: this is uncompleted
  }
  public async report9(): Promise<Report9Type[]> {
    return await this.handleReq(this.url('9'), undefined, 'GET')
  }
}
