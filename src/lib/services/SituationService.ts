import { errorMessage } from '../stores/basic_stores'
import type {
  CarSituation,
  CarSituationCreate,
  CarSituationID,
  CarSituationUpdate,
  DriverSituation,
  DriverSituationCreate,
  DriverSituationID,
  DriverSituationUpdate,
  Situation,
  SituationCreate,
  SituationUpdate,
} from '../types/SituationTypes'
import BaseService from './BaseService'
export default class SituationService extends BaseService {
  protected static instance: SituationService

  private constructor() {
    super()
    this.service = '/situation'
  }

  public static getInstance(): SituationService {
    if (!SituationService.instance) return new SituationService()
    return SituationService.instance
  }

  public async getSituations(
    limit: number | 'ALL' = 'ALL',
    situation_type: 'any' | 'driver' | 'car' = 'any'
  ): Promise<Situation[]> {
    const queryParams = this.makeParams({ limit, situation_type })
    return await this.handleReq(undefined, queryParams, 'GET')
  }

  public async createSituation(situation: SituationCreate): Promise<Situation> {
    return await this.handleReq(undefined, undefined, 'POST', situation)
  }

  public async getSituation(situation_id: string | number): Promise<Situation> {
    return await this.handleReq(
      this.url(situation_id.toString()),
      undefined,
      'GET'
    )
  }

  public async deleteSituation(situation_id: string | number): Promise<any> {
    return await this.handleReq(
      this.url(situation_id.toString()),
      undefined,
      'DELETE'
    )
  }

  public async updateSituation(
    id_situation: string | number,
    situation: SituationUpdate
  ): Promise<Situation> {
    return await this.handleReq(
      this.url(id_situation.toString()),
      undefined,
      'PUT',
      situation
    )
  }

  //car situations
  public async getCarSituations(
    limit: number | 'ALL' = 'ALL'
  ): Promise<CarSituation[]> {
    const queryParams = this.makeParams({ limit })
    return await this.handleReq(this.url('cars'), queryParams, 'GET')
  }

  public async createCarSituation(
    situation: CarSituationCreate
  ): Promise<CarSituation> {
    return await this.handleReq(this.url('cars'), undefined, 'POST', situation)
  }

  public async deleteCarSituation(id: CarSituationID): Promise<any> {
    const qp = this.makeParams(id)
    return await this.handleReq(this.url('cars'), qp, 'DELETE')
  }

  public async updateCarSituation(
    id: CarSituationID,
    situation: CarSituationUpdate
  ): Promise<CarSituation> {
    const qp = this.makeParams(id)
    return await this.handleReq(this.url('cars'), qp, 'PUT', situation)
  }
  //driver situations
  public async getDriverSituations(
    limit: number | 'ALL' = 'ALL'
  ): Promise<DriverSituation[]> {
    const queryParams = this.makeParams({ limit })
    return await this.handleReq(this.url('drivers'), queryParams, 'GET')
  }

  public async createDriverSituation(
    situation: DriverSituationCreate
  ): Promise<DriverSituation> {
    return await this.handleReq(
      this.url('drivers'),
      undefined,
      'POST',
      situation
    )
  }

  public async deleteDriverSituation(id: DriverSituationID): Promise<any> {
    const qp = this.makeParams(id)
    return await this.handleReq(this.url('drivers'), qp, 'DELETE')
  }

  public async updateDriverSituation(
    id: DriverSituationID,
    situation: DriverSituationUpdate
  ): Promise<DriverSituation> {
    const qp = this.makeParams(id)
    return await this.handleReq(this.url('drivers'), qp, 'PUT', situation)
  }
}
