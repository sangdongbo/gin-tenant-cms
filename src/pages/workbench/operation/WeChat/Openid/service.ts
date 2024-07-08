import { request } from '@umijs/max';

const url = API_URL + '/tenant/wechat/openid/analytics';

export async function queryOverviewRule(params?: any): Promise<any> {
  return request(`${url}/overview`, {
    params,
  });
};

export async function queryTimelineRule(params?: any): Promise<any> {
  return request(`${url}/timeline`, {
    params,
  });
};

export async function querySubscribeSceneRule(params?: any): Promise<any> {
  return request(`${url}/subscribe-scene`, {
    params,
  });
};

// 127.0.0.1:8000/tenant/wechat/openid/analytics/subscribe-scene?appid=wx9b69243022939079&star_time=2022-01-01&end_time=2023-01-01&type=unsubscribe_cnt
