import BaseService from "./BaseService";
export default class Placeholder extends BaseService {
  protected static instance: Placeholder;

  private constructor() {
    super();
    this.service = "/placeholder"; //used by the this.url() method to this would be http://localhost:5173/api/v1/services/placeholder
  }

  public static getInstance(): Placeholder {
    if (!Placeholder.instance) return new Placeholder();
    return Placeholder.instance;
  }

  //queries to local here; ex:

  /**
   *
   * @param compID company id to retrieve workers from
   * @param limit limit of entries to get, can also be "ALL", default is 200
   *
   */
  public async getWorkersFromCompany(
    compID: number | string,
    limit: number | "ALL" = 200
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const qp = new URLSearchParams();
      qp.append("compID", compID.toString());
      qp.append("limit", limit.toString());

      fetch(this.url("?" + qp.toString()), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
