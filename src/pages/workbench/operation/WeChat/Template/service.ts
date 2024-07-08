import { request } from '@umijs/max';

const url = API_URL + '/tenant/wechat/template';

export async function queryRule(params?: any): Promise<any> {
  return request(`${url}/wechat`, {
    params,
  });
}
export async function addRule(options?: Record<string, any>) {
  return request(url, {
    method: 'POST',
    data: {
      ...options,
    },
  });
};

export async function updateRule(id: any,options: { [key: string]: any }) {
  return request(`${url}/${id}`, {
    method: 'PUT',
    data: {
      ...options,
    },
  });
}

export async function getRule(id?: any): Promise<any> {
  return request(`${url}/wechat/${id}`);
}

export async function getPreviewQrcodeRule(params?: any): Promise<any> {
  return request(`${url}/preview-qrcode`, {
    params
  });
}

export async function getSyncRule(params?: any): Promise<any> {
  return request(`${url}/sync-wechat`, {
    params,
  });
}

export async function queryTemplateRule(params?: any): Promise<any> {
  return request(url, {
    params,
  });
};
