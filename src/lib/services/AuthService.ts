import BaseService from './BaseService'
import type { LoggedInTransition, LoginType } from '$lib/types/AuthTypes'
export default class AuthService extends BaseService {
  protected static instance: AuthService

  private constructor() {
    super()
    this.service = '/auth'
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) return new AuthService()
    return AuthService.instance
  }

  public async login(login: LoginType): Promise<LoggedInTransition> {
    return await this.handleReq(this.url('login'), undefined, 'POST', login)
  }

  public async getRoleName(id_role: number): Promise<string> {
    return await this.handleReq(this.url('role/' + id_role), undefined, 'GET')
  }
}
