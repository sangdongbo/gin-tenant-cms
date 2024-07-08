import { request } from '@umijs/max';

const url = API_URL + '/tenant/utm/select';

export async function selectRule(params: { [source: string]: any }) {
  return request(`${url}/${params.source}`);
}
