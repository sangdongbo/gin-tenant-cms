import { request } from '@umijs/max';

const url = API_URL + '/tenant/wechat';

export async function getRule(appid: string): Promise<any> {
  return request(`${url}/menu/${appid}`);
}

export async function createRule(params: any): Promise<any> {
  return request(`${url}/menu`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getMenuOverviewRule(params?: any): Promise<any> {
  return request(`${url}/menu/analytics/overview`, {
    params,
  });
}

export async function getMenuTimelineRule(params?: any): Promise<any> {
  return request(`${url}/menu/analytics/timeline`, {
    params,
  });
}

export async function queryMaterialRule(params?: any): Promise<any> {
  return request(`${url}/material/wechat`, {
    params,
  });
};
