import { request } from '@umijs/max';

const url = API_URL + '/tenant/data-center';
const systemUrl = API_URL + '/tenant/system';

export async function createConfigRule(data: { [key: string]: any }) {
  return request(`${systemUrl}/config`, {
    method: 'POST',
    data: data,
  });
}

export async function getConfigRule(params?: any): Promise<any> {
  return request(`${systemUrl}/config/lifecycle`, {
    params,
  });
}

export async function getLifeCycleOverviewRule(params?: any): Promise<any> {
  return request(`${url}/life-cycle/overview`, {
    params,
  });
}

export async function getLifeCycleTimelineRule(params?: any): Promise<any> {
  return request(`${url}/life-cycle/timeline`, {
    params,
  });
}
