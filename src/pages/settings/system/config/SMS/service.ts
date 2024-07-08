import { request } from '@umijs/max';

const url: string = API_URL + '/tenant/system/config';

export async function getServiceRule(type: string) {
  return request(`${url}/${type}`);
}

export async function createServiceRule(params: any) {
  return request(`${url}`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
