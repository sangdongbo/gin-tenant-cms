import { request } from '@umijs/max';

const url = API_URL + '/tenant/ai/gpt/conversation';

export async function queryRule(params?: { [key: string]: any }) {
  return request(url, {
    params,
  });
}
