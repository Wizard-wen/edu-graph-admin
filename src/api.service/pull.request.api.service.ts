/**
 *
 */

import type { PullRequestModelType } from "metagraph-constant";
import { ApiPathEnum, RequestUtil, PublicApiResponseType } from './api.config';


export class PullRequestApiService {
  static async getList(params: { pageIndex: number; pageSize: number; }): Promise<PublicApiResponseType<{
    total: number;
    list: PullRequestModelType[];
  }>> {
    return RequestUtil.post<{ pageIndex: number; pageSize: number; }, any>({
      apiPath: ApiPathEnum.GetPullRequestList,
      requestBody: params
    })
  }

  static async getDetail(params: { entityId: string }): Promise<PublicApiResponseType<any>> {
    return RequestUtil.post<{ entityId: string }, any>({
      apiPath: ApiPathEnum.GetPullRequestDetail,
      requestBody: params
    })
  }
}
