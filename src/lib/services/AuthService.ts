import BaseService from './BaseService'
import type { LoggedInTransition, LoginType } from '$lib/types/AuthTypes'
import { loggedUser } from '../stores/basic_stores'
import { get } from 'svelte/store'
import type { rolename } from '../types/UserTypes'
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

  public async getRoleName(id_role: number): Promise<rolename> {
    return await this.handleReq(this.url('role/' + id_role), undefined, 'GET')
  }

  public getAuthorizedRoutes(): string[] {
    let authorized_routes: string[] = []
    const users = '/turisfleet/users'
    const drivers = '/turisfleet/drivers'
    const driver = (id: number) => `/turisfleet/drivers/${id}`
    const cars = '/turisfleet/cars'
    const groups = '/turisfleet/groups'
    const requests = '/turisfleet/requests'
    const situations = '/turisfleet/situations'
    const situations_cars = '/turisfleet/situations/cars'
    const situations_drivers = '/turisfleet/situations/drivers'
    const role = get(loggedUser).role_name
    switch (role) {
      case 'administrator':
        authorized_routes = [
          users,
          drivers,
          cars,
          groups,
          requests,
          situations,
          situations_cars,
          situations_drivers,
        ]
        break
      case 'agent':
        authorized_routes = [
          drivers,
          cars,
          groups,
          requests,
          situations,
          situations_cars,
          situations_drivers,
        ]
        break
      case 'driver':
        authorized_routes = [
          driver(get(loggedUser).id_user), //TODO change
        ]
        break
      case 'support':
        authorized_routes = [users]
        break
      default:
        authorized_routes = [
          '/auth/login',
        ]
    }
    return authorized_routes
  }
}
