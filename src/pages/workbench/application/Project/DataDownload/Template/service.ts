import { request } from '@umijs/max';

const url = API_URL + '/tenant/project/data-download';

export async function queryRule(params?: { [key: string]: any }) {
  return request(url, {
    params,
  });
}
export async function getRule(id: number, params?: any) {
  return request(`${url}/${id}`, { params });
}
export async function addRule(data: { [key: string]: any }) {
  return request(`${url}`, {
    method: 'POST',
    data: data,
  });
}

export async function updateRule(id: number, data?: { [key: string]: any }) {
  return request(`${url}/${id}`, {
    method: 'PUT',
    data: data,
  });
}

export async function removeRule(id: number) {
  return request(`${url}/${id}`, {
    method: 'DELETE',
  });
}

export async function sortRule(data: { [key: string]: any }) {
  return request(`${url}/sort`, {
    method: 'POST',
    data: data,
  });
}

export async function queryTreeRule(params?: { [key: string]: any }) {
  return request(`${url}/tree`, {
    params,
  });
}
