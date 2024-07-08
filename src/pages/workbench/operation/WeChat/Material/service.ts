import { request } from '@umijs/max';

const url = API_URL + '/tenant/wechat';

export async function queryRule(params?: any): Promise<any> {
  return request(`${url}/material`, {
    params,
  });
}

export async function getRule(id: number): Promise<any> {
  return request(`${url}/material/${id}`);
}

export async function addRule(options?: { [key: string]: any }) {
  return request(`${url}/material`, {
    method: 'POST',
    data: {
      ...options,
    },
  });
}

export async function removeRule(id: number) {
  return request(`${url}/material/${id}`, {
    method: 'DELETE',
  });
}

export async function updateRule(options: { [key: string]: any }) {
  return request(`${url}/material/${options.id}`, {
    method: 'PUT',
    data: {
      ...options,
    },
  });
}

export async function querySelectRule(params?: any): Promise<any> {
  return request(`${url}/material/select`, {
    params,
  });
}

export async function queryAsyncRule(params?: any): Promise<any> {
  return request(`${url}/material/async-material`, {
    params,
  });
}

export async function queryMaterialRule(params?: any): Promise<any> {
  return request(`${url}/material/wechat`, {
    params,
  });
}

export async function getMaterialRule(id: number, params?: any): Promise<any> {
  return request(`${url}/material/wechat/${id}`, {
    params,
  });
}
