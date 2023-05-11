import { env } from "$env/dynamic/public";

export default abstract class BaseService {
  protected static instance: BaseService;
  protected service: string;
  protected constructor() {
    this.service = "";
  }

  public static getInstance(): BaseService {
    throw Error("cant get instance of abstract class");
  }

  protected url(extra?: string, api_version = "v1") {
    const SERVICES_PROXY_BASE = `/api/${api_version}/services`;
    if (!extra) return SERVICES_PROXY_BASE + this.service;
    else if (extra.startsWith("?"))
      return SERVICES_PROXY_BASE + this.service + extra;
    else return SERVICES_PROXY_BASE + this.service + "/" + extra;
  }

  protected makeParams(params: Object): string {
    let queryParams = "?";
    const queryBuilder = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      queryBuilder.append(key, value);
    });
    queryParams += queryBuilder.toString();
    return queryParams;
  }
}
