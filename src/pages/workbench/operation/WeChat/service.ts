import { request } from '@umijs/max';

const url = API_URL + '/tenant/wechat';

// /tenant/wechat/ai-reply/1

export async function removeAiReplyRule(id: number) {
  return request(`${url}/ai-reply/${id}`, {
    method: 'DELETE',
  });
}

export async function addAiReplyRule(data?: any) {
  return request(`${url}/ai-reply`, {
    method: 'POST',
    data,
  });
}
