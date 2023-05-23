import { popup } from '../stores/basic_stores'
import type {
  Request,
  RequestCreate,
  RequestUpdate,
} from '../types/RequestTypes'
import BaseService from './BaseService'
export default class RequestService extends BaseService {
  protected static instance: RequestService

  private constructor() {
    super()
    this.service = '/request'
  }

  public static getInstance(): RequestService {
    if (!RequestService.instance) return new RequestService()
    return RequestService.instance
  }

  public async getRequests(limit: number | 'ALL' = 'ALL'): Promise<Request[]> {
    const queryParams = this.makeParams({ limit })
    return await this.handleReq(undefined, queryParams, 'GET')
  }

  public async createRequest(request: RequestCreate): Promise<Request> {
    return await this.handleReq(undefined, undefined, 'POST', request)
  }

  public async getRequest(id: string | number): Promise<Request> {
    return await this.handleReq(this.url(id.toString()), undefined, 'GET')
  }
  
  public async deleteRequest(id: string | number): Promise<any> {
    return await this.handleReq(this.url(id.toString()), undefined, 'DELETE')
  }

  public async updateRequest(
    id: string | number,
    request: RequestUpdate
  ): Promise<Request> {
    return await this.handleReq(
      this.url(id.toString()),
      undefined,
      'PUT',
      request
    )
  }
}
