/**
 *
 */

import axios from 'axios';

export enum ApiPathEnum {
  // pull request
  GetPullRequestList = '/admin/pull/request/getList',
  GetPullRequestDetail = '/admin/pull/request/detail',
  // user
  GetUserList = '/admin/account/user/getList',
  //domain
  GetDomainList = '/admin/domain/getList',
  CreateDomain = '/admin/domain/create',
  RemoveDomain = '/admin/domain/remove',
  UpdateDomain = '/admin/domain/update',
  //domain base type
  GetDomainBaseTypeList = '/admin/domainBaseType/getList',
  GetDomainBaseTypeTotalList = '/admin/domainBaseType/getTotalList',
  ChangeDomainBaseTypeChangeStatus = '/admin/domainBaseType/changeStatus',
  CreateDomainBaseType = '/admin/domainBaseType/create'
}

export interface PublicApiResponseType<T> {
  data?: T;
  message?: string;
}

export class RequestUtil {
  static post<RequestType, ResponseType>(params: {
    requestBody: RequestType,
    apiPath: ApiPathEnum
  }): Promise<PublicApiResponseType<ResponseType>> {
    return new Promise((resolve) => {
      axios.post<{
        data: ResponseType;
        code: number;
        message: string;
      }>(params.apiPath, params.requestBody).then((data) => {
        if (data.data.code === 0) {
          resolve({
            data: data.data.data
          });
        }
        resolve({ message: data.data.message });
      }).catch((error) => {
        resolve({
          message: error.message
        });
      });
    });
  }

  static get<ResponseType>(params: {
    apiPath: ApiPathEnum
  }): Promise<PublicApiResponseType<ResponseType>> {
    return new Promise((resolve) => {
      axios.get<{
        data: ResponseType;
        code: number;
        message: string;
      }>(params.apiPath).then((data) => {
        if (data.data.code === 0) {
          resolve({
            data: data.data.data
          });
        }
        resolve({ message: data.data.message });
      }).catch((error) => {
        resolve({
          message: error.message
        });
      });
    });
  }
}
