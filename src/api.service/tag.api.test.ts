/**
 * @author songxiwen
 * @date  2021/12/19 13:17
 */

import {
  ApiPathEnum,
  PublicApiResponseType,
  RequestUtil
} from "@/api.service/api.config";

export class TagApiTest {
  static async create(params: { name: string; }): Promise<PublicApiResponseType<any>> {
    return RequestUtil.post<{ name: string; }, any>({
      apiPath: ApiPathEnum.CreateTag,
      requestBody: params
    })
  }

  static async getList(params: { pageIndex: number, pageSize: number }): Promise<PublicApiResponseType<{
    list: any[],
    total: number
  }>> {
    return RequestUtil.post<{ pageIndex: number, pageSize: number }, {
      list: any[],
      total: number
    }>({
      apiPath: ApiPathEnum.GetTagList,
      requestBody: params
    })
  }
}
