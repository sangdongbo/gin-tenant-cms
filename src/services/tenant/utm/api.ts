import { request } from '@umijs/max';

const url = API_URL + '/tenant/utm';

export async function queryRule(params: { [key: string]: any }) {
  return request(url, {
    params,
  });
}

export async function addRule(data: { [key: string]: any }) {
  return request(url, {
    method: 'POST',
    data: data,
  });
}

export async function deleteRule(id: number) {
  return request(`${url}/${id}`, {
    method: 'DELETE',
  });
}
