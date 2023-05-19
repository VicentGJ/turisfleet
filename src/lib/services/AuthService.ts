import BaseService from "./BaseService";
import type { Login } from "$lib/types/AuthTypes";
export default class AuthService extends BaseService {
  protected static instance: AuthService;

  private constructor() {
    super();
    this.service = "/login";
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) return new AuthService();
    return AuthService.instance;
  }

  public async login(login: Login): Promise<any> {
    return await this.handleReq(undefined, undefined, "POST", login);
  }
}
