/**
 * @author songxiwen
 * @date  2021/9/14 15:21
 */
import type { UserModelType } from "metagraph-constant";
import { ApiPathEnum, RequestUtil, PublicApiResponseType } from './api.config';


export class UserApiService {
  static async getList(params: { pageIndex: number; pageSize: number; }): Promise<PublicApiResponseType<{
    total: number;
    list: UserModelType[];
  }>> {
    return RequestUtil.post<{ pageIndex: number; pageSize: number; }, {
      total: number;
      list: UserModelType[];
    }>({
      apiPath: ApiPathEnum.GetUserList,
      requestBody: params
    })
  }
}
