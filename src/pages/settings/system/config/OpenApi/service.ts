import { request } from '@umijs/max';

const url: string = API_URL + '/tenant/system/open-api';

export async function getRule() {
  return request(`${url}/client`);
}

export async function addRule() {
  return request(`${url}/client`, {
    method: 'POST',
  });
}

export async function getResetClientSecret(params: any) {
  return request(`${url}/client/reset-client-secret`, {
    params,
  });
}
