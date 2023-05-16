import { env } from "$env/dynamic/public";
import { loading } from "$stores/basic_stores";
export default abstract class BaseService {
  protected static instance: BaseService;

  protected service: string = "";
  protected constructor() {}

  protected static getInstance(): BaseService {
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

  protected async handleReq(
    route: string = this.url(),
    queryparams: string = "",
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body: any = undefined,
    headers: Headers = new Headers()
  ): Promise<any> {
    let r: RequestInit = {};
    headers.append("x-token", env.SV_TOKEN);
    if ((method === "PUT" || method === "POST") && body) {
      headers.append("Content-Type", "application/json");
      r.body = JSON.stringify(body);
    }

    r.headers = headers;
    r.method = method;

    return await new Promise<any>((resolve, reject) => {
      loading.update(() => true);
      fetch(route + queryparams, r)
        .then((response) => response.json())
        .then((responseData) => {
          loading.update(() => false);
          resolve(responseData);
        })
        .catch((error) => {
          loading.update(() => true);

          console.error(error);
          reject(error);
        });
    });
  }
}
