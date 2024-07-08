import { request } from '@umijs/max';

const url = API_URL + '/tenant/forms';

export async function queryRule(params?: { [key: string]: any }) {
  return request(url, {
    params,
  });
}

export async function addRule(data: { [key: string]: any }) {
  return request(`${url}`, {
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

export async function deleteRule(id: number) {
  return request(`${url}/${id}`, {
    method: 'DELETE',
  });
}

export async function queryBasicRule(project_id: any, options?: any) {
  return request(`${url}/${project_id}`, {
    ...options,
  });
}

export async function updateBasicRule(id: number, data?: { [key: string]: any }) {
  return request(`${url}/${id}`, {
    method: 'PUT',
    data: data,
  });
}


export async function querySelectRule(params?: { [key: string]: any }) {
  return request(`${url}/select`, {
    params,
  });
}


export async function addContactsFieldsRule(data?: { [key: string]: any }) {
  return request(`${url}/fields`, {
    method: 'POST',
    data: data,
  });
};

export async function getContactsFieldsRule(params?: { [key: string]: any }) {
  return request(`${url}/fields/all`, {
    params,
  });
}

export async function updateContactsFieldsRule(id: any, data?: { [key: string]: any }) {
  return request(`${url}/fields/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function queryContactsRule(params?: any): Promise<any> {
  return request(`${url}/contacts`, {
    params,
  });
}


export async function queryContactsProjectsRule(id: any,params?: any): Promise<any> {
  return request(`${url}/contacts/projects/${id}`, {
    params,
  });
}

export async function queryProjectRule(id: any, params?: { [key: string]: any }) {
  return request(`${url}/project/${id}`, {
    params,
  });
}
