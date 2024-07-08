import { request } from '@umijs/max';

const url: string = API_URL + '/tenant/hubspot';

export async function queryContactsFieldRule(params?: { [key: string]: any }) {
  return request(`${url}/contacts/field`, {
    params,
  });
}

export async function addContactsFieldRule(options?: { [key: string]: any }) {
  return request(`${url}/contacts/field`, {
    method: 'POST',
    data: {
      ...options,
    },
  });
}

export async function queryPropertiesRule(params?: any): Promise<any> {
  return request(`${url}/properties`, {
    params,
  });
}

export async function addAuthConfigRule(params?: any): Promise<any> {
  return request(`${url}/auth/config`, {
    params,
  });
}
