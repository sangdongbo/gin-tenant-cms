import { request } from '@umijs/max';

const url = API_URL + '/tenant/contacts';

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

export async function getRule(id: string) {
  return request(`${url}/${id}`);
}

export async function addImportRule(data: { [key: string]: any }) {
  return request(`${url}/import`, {
    method: 'POST',
    data: data,
  });
}

export async function queryTimelineRule(id: string, params?: { [key: string]: any }) {
  return request(`${url}/analytics/timeline/${id}`, {
    params,
  });
}


export async function addNotesRule(data: { [key: string]: any }) {
  return request(`${url}/notes`, {
    method: 'POST',
    data: data,
  });
}

export async function queryNotesRule(params?: { [key: string]: any }) {
  return request(`${url}/notes`, {
    params,
  });
}

export async function deleteNotesRule(id: number) {
  return request(`${url}/notes/${id}`, {
    method: 'DELETE',
  });
}

export async function updateStarRule(id: number, data?: { [key: string]: any }) {
  return request(`${url}/star/${id}`, {
    method: 'PUT',
    data: data,
  });
}

export async function addCustomTagRule(data: { [key: string]: any }) {
  return request(`${url}/custom-tag`, {
    method: 'POST',
    data: data,
  });
}
