import { request } from '@umijs/max';

const url = API_URL + '/tenant/ai/gpt/project/mail-template';

export async function getRule(id: number, params?: any) {
  return request(`${url}/${id}`, { params });
}

export async function createRule(data?: { [key: string]: any }) {
  return request(`${url}`, {
    method: 'POST',
    data: data,
  });
}
