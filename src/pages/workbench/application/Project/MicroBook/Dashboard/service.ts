import { request } from '@umijs/max';

const url = API_URL + '/tenant/project/microbook/analytics';

export async function queryOverviewRule(params?: { [key: string]: any }) {
  return request(`${url}/overview`, {
    params,
  });
}

export async function queryTimelineRule(params?: { [key: string]: any }) {
  return request(`${url}/timeline`, {
    params,
  });
}

export async function queryUserTopRule(params?: { [key: string]: any }) {
  return request(`${url}/top`, {
    params,
  });
}
