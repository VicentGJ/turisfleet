import BaseService from "./BaseService";
import type { Group, GroupCreate, GroupUpdate } from "../types/GroupTypes";
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

  public async getGroups(limit: number | "ALL" = "ALL"): Promise<Group[]> {
    const queryParams = this.makeParams({ limit });
    return await this.handleReq(undefined, queryParams, "GET");
  }

  public async createGroup(group: GroupCreate): Promise<Group> {
    return await this.handleReq(undefined, undefined, "POST", group);
  }

  public async getGroup(id: string | number): Promise<Group> {
    return await this.handleReq(this.url(id.toString()), undefined, "GET");
  }

  public async deleteGroup(id: string | number): Promise<any> {
    return await this.handleReq(this.url(id.toString()), undefined, "DELETE");
  }

  public async updateGroup(
    id: string | number,
    group: GroupUpdate
  ): Promise<any> {
    return await this.handleReq(this.url(id.toString()), undefined, "PUT", group);
  }
}
