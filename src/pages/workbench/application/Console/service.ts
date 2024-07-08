import { request } from '@umijs/max';

const url = API_URL + '/tenant/project';

export async function queryRule(params?: { [key: string]: any }) {
  return request(url, {
    params,
  });
}

export async function queryCountRule() {
  return request(`${url}/count`);
}
