import { request } from '@umijs/max';

const url = API_URL + '/tenant/ai/gpt/dashboard';

export async function queryOverviewRule(params?: { [key: string]: any }) {
  return request(`${url}/overview`, {
    params,
  });
}

export async function queryResponseOverviewRule(params?: { [key: string]: any }) {
  return request(`${url}/response-overview`, {
    params,
  });
}
