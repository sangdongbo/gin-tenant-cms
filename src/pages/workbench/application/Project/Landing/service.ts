import { request } from '@umijs/max';

const url = API_URL + '/tenant/project/landing';

export async function getEditRuntimeRule(id: number) {
  return request(`${url}/edit-runtime/${id}`);
}

export async function addEditRuntimeRule(data: { [key: string]: any }) {
  return request(`${url}/edit-runtime`, {
    method: 'POST',
    data: data,
  });
}
