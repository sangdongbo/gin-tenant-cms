import { request } from '@umijs/max';

const url = API_URL + '/tenant/wechat/freepublish';

export function queryRule(params?: any): Promise<any> {
  return request(`${url}`, {
    params,
  });
}
export async function getRule(id: number): Promise<any> {
  return request(`${url}/${id}`);
}
export async function getIdsRule(params?: any): Promise<any> {
  return request(`${url}/ids`,{
    params,
  });
}
export function asyncRule(params?: any): Promise<any> {
  return request(`${url}/async-day`, {
    params,
  });
}

// http://127.0.0.1:8000/tenant/wechat/freepublish/article-id/{article_id}?appid=xxx
export async function getArticleIdRule(id: string, params?: any): Promise<any> {
  return request(`${url}/article-id/${id}`,{
    params,
  });
}
