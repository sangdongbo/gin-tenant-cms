import { request } from '@umijs/max';

const url = API_URL + '/tenant/wechat/authorizer';

export async function addMicrobookRule(options?: any) {
  return request(url, {
    method: 'POST',
    data: {
      ...options,
    },
  });
}

export async function queryRule(params?: any): Promise<any> {
  return request(url, {
    params,
  });
}

export async function queryAllRule(params?: any): Promise<any> {
  return request(`${url}/all`, {
    params,
  });
}
export async function queryAuthUrlRule(): Promise<any> {
  return request(`${url}/url`);
}

export async function querySelectRule(params?: any): Promise<any> {
  return request(`${url}/select`, {
    params,
  });
}

export async function updateRule(options?: any) {
  return request(`${url}/${options.id}`, {
    method: 'PUT',
    data: {
      ...options,
    },
  });
}
