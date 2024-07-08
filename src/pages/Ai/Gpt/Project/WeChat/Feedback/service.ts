import { request } from '@umijs/max';

const url = API_URL + '/tenant/ai/gpt/dashboard';

export async function queryRule(params?: { [key: string]: any }) {
  return request(`${url}/feedback-list`, {
    params,
  });
}
