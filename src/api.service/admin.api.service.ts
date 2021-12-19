/**
 * @author songxiwen
 * @date  2021/8/30 16:40
 */

import {
  ApiPathEnum,
  PublicApiResponseType,
  RequestUtil
} from "@/api.service/api.config";

export class AdminApiService {
  static async login(params: { pageIndex: number; pageSize: number; }): Promise<PublicApiResponseType<any>> {
    return RequestUtil.post<{ pageIndex: number; pageSize: number; }, any>({
      apiPath: ApiPathEnum.GetPullRequestList,
      requestBody: params
    })
  }
}
