import { request } from '@umijs/max';

const url = API_URL + '/tenant/contacts/field';

export async function queryRule(params?: { [key: string]: any }) {
  return request(url, {
    params,
  });
}

export async function addRule(data: { [key: string]: any }) {
  return request(url, {
    method: 'POST',
    data: data,
  });
}

export async function updateRule(id: number, data?: { [key: string]: any }) {
  return request(`${url}/${id}`, {
    method: 'PUT',
    data: data,
  });
}


export async function queryRuleRule(params?: { [key: string]: any }) {
  return request(`${url}/rule`, {
    params,
  });
}


export async function querySelectRule(params?: { [key: string]: any }) {
  return request(`${url}/select`, {
    params,
  });
}

export async function getSelectRuleRule(params?: any) {
  return request(`${url}/select-rule`, {
    params
  });
}

export async function getNameRule(name: string, params?: any) {
  return request(`${url}/${name}`, { params });
}
