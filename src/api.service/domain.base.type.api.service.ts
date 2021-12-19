/**
 * @author songxiwen
 * @date  2021/9/13 23:11
 */
import {
  ApiPathEnum,
  PublicApiResponseType,
  RequestUtil
} from "@/api.service/api.config";
import { DomainBaseTypeModelType } from "metagraph-constant";


export class DomainBaseTypeApiService {
  static async getList(params: { pageIndex: number; pageSize: number; }): Promise<PublicApiResponseType<any>> {
    return RequestUtil.post<{ pageIndex: number; pageSize: number; }, any>({
      apiPath: ApiPathEnum.GetDomainBaseTypeList,
      requestBody: params
    })
  }

  static async getTotalList(): Promise<PublicApiResponseType<{
    list: DomainBaseTypeModelType[]
  }>> {
    return RequestUtil.post<undefined, {
      list: DomainBaseTypeModelType[]
    }>({
      apiPath: ApiPathEnum.GetDomainBaseTypeTotalList,
      requestBody: undefined
    })
  }

  static async create(params: { name: string }): Promise<PublicApiResponseType<any>> {
    return RequestUtil.post<{ name: string }, any>({
      apiPath: ApiPathEnum.CreateDomainBaseType,
      requestBody: params
    })
  }

  static async changeStatus(params: { id: string; isDeleted: boolean }): Promise<PublicApiResponseType<any>> {
    return RequestUtil.post<{ id: string; isDeleted: boolean }, any>({
      apiPath: ApiPathEnum.ChangeDomainBaseTypeChangeStatus,
      requestBody: params
    })
  }
}
