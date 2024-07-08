import { request } from '@umijs/max';

const url = API_URL + '/tenant/ai/gpt/repository-data';

export async function queryRule(params?: any) {
  return request(`${url}`, {
    params,
  });
}

export async function addRule(data: { [key: string]: any }) {
  return request(`${url}/custom`, {
    method: 'POST',
    data: data,
  });
}

export async function updateRule(id: number, data?: { [key: string]: any }) {
  return request(`${url}/custom/${id}`, {
    method: 'PUT',
    data: data,
  });
}

export async function getRule(id: number) {
  return request(`${url}/${id}`);
}

export async function deleteRule(id: number) {
  return request(`${url}/${id}`, {
    method: 'DELETE',
  });
}
