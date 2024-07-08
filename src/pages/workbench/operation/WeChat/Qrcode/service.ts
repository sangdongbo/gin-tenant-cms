import { request } from '@umijs/max';

const url = API_URL + '/tenant/wechat/qrcode';

export async function queryRule(params?: any): Promise<any> {
  return request(url, {
    params,
  });
}

export async function getSceneStrRule(scene_str: string): Promise<any> {
  return request(`${url}/scene-str/${scene_str}`);
}

export async function addRule(options?: { [key: string]: any }) {
  return request(url, {
    method: 'POST',
    data: {
      ...options,
    },
  });
}

export async function updateRule(options: { [key: string]: any }) {
  return request(`${url}/${options.id}`, {
    method: 'PUT',
    data: {
      ...options,
    },
  });
}

export async function getSceneStrStatisticsRule(params?: any): Promise<any> {
  return request(`${url}/analytics/overview`, {
    params,
  });
}
