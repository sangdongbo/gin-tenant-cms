import { request } from '@umijs/max';

const url: string = API_URL + '/tenant/system/config';

export async function getRule(type: string) {
  return request(`${url}/${type}`);
}

export async function getHubSpotRule() {
  return request(`${url}/hubspot`);
}
