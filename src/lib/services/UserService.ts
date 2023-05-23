import type {
  Role,
  User,
  UserChangePassword,
  UserCreate,
  UserUpdate,
} from '../types/UserTypes'
import BaseService from './BaseService'
export default class UserService extends BaseService {
  protected static instance: UserService

  private constructor() {
    super()
    this.service = '/user'
  }

  public static getInstance(): UserService {
    if (!UserService.instance) return new UserService()
    return UserService.instance
  }

  public async getUsers(limit: number | 'ALL' = 'ALL'): Promise<User[]> {
    const queryParams = this.makeParams({ limit })
    return await this.handleReq(undefined, queryParams, 'GET')
  }

  public async createUser(user: UserCreate): Promise<undefined> {
    //TODO check on this
    return await this.handleReq(undefined, undefined, 'POST', user)
  }

  public async getUser(id: number): Promise<User> {
    return await this.handleReq(this.url(id.toString()), undefined, 'GET')
  }

  public async deleteUser(id: number): Promise<any> {
    return await this.handleReq(this.url(id.toString()), undefined, 'DELETE')
  }

  public async updateUser(id: number, user: UserUpdate): Promise<any> {
    return await this.handleReq(this.url(id.toString()), undefined, 'PUT', user)
  }
  public async changePassword(
    id: number,
    password: UserChangePassword
  ): Promise<any> {
    return await this.handleReq(
      this.url(id.toString() + '/change-password'),
      undefined,
      'PUT',
      password
    )
  }

  public async getRoles(): Promise<Role[]> {
    return await this.handleReq(this.url('roles'), undefined, 'GET')
  }
}
