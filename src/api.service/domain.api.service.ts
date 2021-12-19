import {
  ApiPathEnum,
  PublicApiResponseType,
  RequestUtil
} from "@/api.service/api.config";

/**
 * @author songxiwen
 * @date  2021/8/30 16:41
 */

export class DomainApiService {
  static async create(params: { domainBaseTypeId: string; name: string; description?: string; }): Promise<PublicApiResponseType<any>> {
    return RequestUtil.post<{ domainBaseTypeId: string; name: string; description?: string; }, any>({
      apiPath: ApiPathEnum.CreateDomain,
      requestBody: params
    })
  }

  static async remove(params: { domainId: string }): Promise<PublicApiResponseType<any>> {
    return RequestUtil.post<{ domainId: string }, any>({
      apiPath: ApiPathEnum.RemoveDomain,
      requestBody: params
    })
  }

  static async update(params: { domainId: string; domainBaseTypeId: string; name: string; description?: string; }): Promise<PublicApiResponseType<any>> {
    return RequestUtil.post<{ domainId: string; domainBaseTypeId: string; name: string; description?: string; }, any>({
      apiPath: ApiPathEnum.UpdateDomain,
      requestBody: params
    })
  }

  static async getList(params: { pageIndex: number; pageSize: number; domainBaseTypeId?: string; }): Promise<PublicApiResponseType<any>> {
    return RequestUtil.post<{ pageIndex: number; pageSize: number; domainBaseTypeId?: string; }, any>({
      apiPath: ApiPathEnum.GetDomainList,
      requestBody: params
    })
  }
}
