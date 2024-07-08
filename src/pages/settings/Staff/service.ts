import { request } from '@umijs/max';

const url: string = API_URL + '/tenant/auth/staff';

export async function queryUserRule(params?: any) {
  return request(`${url}/user`, {
    params,
  });
}
export async function removeUserRule(id: number) {
  return request(`${url}/user/${id}`, {
    method: 'DELETE',
  });
}
export async function addUserRule(params: any) {
  return request(`${url}/user`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function updateUserRule(params: any) {
  return request(`${url}/user/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function getUserRule(id: number) {
  return request(`${url}/user/${id}`);
}
export async function changeUserRule(params: any) {
  return request(`${url}/user/change/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function queryRoleRule(params?: any) {
  return request(`${url}/role`, {
    params,
  });
}
export async function addRoleRule(params: any) {
  return request(`${url}/role`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function updateRoleRule(params: any) {
  return request(`${url}/role/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
export async function removeRoleRule(id: number) {
  return request(`${url}/role/${id}`, {
    method: 'DELETE',
  });
}
export async function selectRoleRule(params?: any) {
  return request(`${url}/role/select`, {
    params,
  });
}
export async function getRoleRule(id: number) {
  return request(`${url}/role/${id}`);
}

export async function selectPermissionRule(params?: any) {
  return request(`${url}/permission/permission-select`, {
    params,
  });
}
