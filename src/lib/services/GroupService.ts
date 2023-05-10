import BaseService from "./BaseService";
import type { GroupCreate, GroupUpdate } from "../types/GroupTypes";
export default class GroupService extends BaseService {
  protected static instance: GroupService;

  private constructor() {
    super();
    this.service = "/group";
  }

  public static getInstance(): GroupService {
    if (!GroupService.instance) return new GroupService();
    return GroupService.instance;
  }

  public async getGroups(limit: number | "ALL" = 200): Promise<any> {
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

  public async createGroup(group: GroupCreate): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(), {
        method: "POST",
        body: JSON.stringify(group),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async getGroup(id: string | number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(id.toString()), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async deleteGroup(id: string | number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(id.toString()), {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  public async updateGroup(
    id: string | number,
    group: GroupUpdate
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      fetch(this.url(id.toString()), {
        method: "PUT",
        body: JSON.stringify(group),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
