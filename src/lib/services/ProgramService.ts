import BaseService from './BaseService'
import type {
  Program,
  ProgramCreate,
  ProgramUpdate,
  SpecificProgram,
  SpecificProgramCreate,
  SpecificProgramUpdate,
} from '../types/ProgramTypes'
import { popup } from '$stores/basic_stores'
export default class ProgramService extends BaseService {
  protected static instance: ProgramService

  private constructor() {
    super()
    this.service = '/program'
  }

  public static getInstance(): ProgramService {
    if (!ProgramService.instance) return new ProgramService()
    return ProgramService.instance
  }

  public async getPrograms(limit: number | 'ALL' = 'ALL'): Promise<Program[]> {
    const queryParams = this.makeParams({ limit })
    return await this.handleReq(undefined, queryParams, 'GET')
  }

  public async createProgram(program: ProgramCreate): Promise<Program> {
    return await this.handleReq(undefined, undefined, 'POST', program)
  }

  public async getProgram(id: string | number): Promise<Program> {
    return await this.handleReq(this.url(id.toString()), undefined, 'GET')
  }

  public async deleteProgram(id: string | number): Promise<any> {
    return await this.handleReq(this.url(id.toString()), undefined, 'DELETE')
  }

  public async updateProgram(
    id: string | number,
    program: ProgramUpdate
  ): Promise<Program> {
    return await this.handleReq(
      this.url(id.toString()),
      undefined,
      'PUT',
      program
    )
  }

  //specific programs
  public async getSpecificPrograms(
    limit: number | 'ALL' = 'ALL'
  ): Promise<SpecificProgram[]> {
    const queryParams = this.makeParams({ limit })
    return await this.handleReq(
      this.url('specific' + queryParams),
      undefined,
      'GET'
    )
  }

  public async createSpecificProgram(
    program: SpecificProgramCreate
  ): Promise<SpecificProgram> {
    return await this.handleReq(
      this.url('specific'),
      undefined,
      'POST',
      program
    )
  }
  public async getSpecificProgram(
    id: string | number
  ): Promise<SpecificProgram> {
    return await this.handleReq(
      'specific/' + this.url(id.toString()),
      undefined,
      'GET'
    )
  }

  public async deleteSpecificProgram(id: string | number): Promise<any> {
    return await this.handleReq(
      this.url('specific/' + id.toString()),
      undefined,
      'DELETE'
    )
  }
  public async updateSpecificProgram(
    id: string | number,
    program: SpecificProgramUpdate
  ): Promise<SpecificProgram> {
    return await this.handleReq(
      this.url('specific/' + id.toString()),
      undefined,
      'PUT',
      program
    )
  }
}
