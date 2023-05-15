import type {
  Request,
  RequestCreate,
  RequestUpdate,
} from "../types/RequestTypes";
import BaseService from "./BaseService";
export default class RequestService extends BaseService {
  protected static instance: RequestService;

  private constructor() {
    super();
    this.service = "/request";
  }

  public static getInstance(): RequestService {
    if (!RequestService.instance) return new RequestService();
    return RequestService.instance;
  }

  public async getRequests(limit: number | "ALL" = "ALL"): Promise<Request[]> {
    return new Promise<any>((resolve, reject) => {
      const queryParams = this.makeParams({ limit });
      fetch(this.url(queryParams), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async createRequest(request: RequestCreate): Promise<Request> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(), {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async getRequest(id: string | number): Promise<Request> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(id.toString()), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async deleteRequest(id: string | number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(id.toString()), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async updateRequest(
    id: string | number,
    request: RequestUpdate
  ): Promise<Request> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(id.toString()), {
        method: "PUT",
        body: JSON.stringify(request),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
