import { request } from '@umijs/max';

const url = API_URL + '/tenant/hubspot/auth/oauth-callback';

export async function bindRule(params: any) {
  return request(`${url}`, {
    params,
  });
}
