import { request } from '@umijs/max';

const url = API_URL + '/tenant/tag';

export async function queryRule(params?: any): Promise<any> {
  return request(url, {
    params,
  });
}

export async function queryAllRule(params?: any): Promise<any> {
  return request(`${url}/all`, {
    params,
  });
}

export async function queryTypeSelectRule(params?: any): Promise<any> {
  return request(`${url}/type/select`, {
    params,
  });
}

export async function queryTableListRule(params?: any): Promise<any> {
  return request(`${url}/table-list`, {
    params,
  });
}

export async function querySelectRule(params?: any): Promise<any> {
  return request(`${url}/select`, {
    params,
  });
}

export async function queryTreeSelectRule(params?: any): Promise<any> {
  return request(`${url}/tree-select`, {
    params,
  });
}

export async function removeRule(id: string) {
  return request(`${url}/${id}`, {
    method: 'DELETE',
  });
}

export async function addRule(options?: { [key: string]: any }) {
  return request(url, {
    method: 'POST',
    data: {
      ...options,
    },
  });
}

export async function addCategoryRule(options?: { [key: string]: any }) {
  return request(`${url}/group`, {
    method: 'POST',
    data: {
      ...options,
    },
  });
}

export async function updateCategoryRule(options?: { [key: string]: any }) {
  return request(`${url}/group/${options?.id}`, {
    method: 'PUT',
    data: {
      ...options,
    },
  });
}

export async function queryCategorySelectRule(params?: any): Promise<any> {
  return request(`${url}/group/select`, {
    params,
  });
}

export async function updateRule(options?: { [key: string]: any }) {
  return request(`${url}/${options?.id}`, {
    method: 'PUT',
    data: {
      ...options,
    },
  });
}

export async function queryStatisticRule(params?: any): Promise<any> {
  return request(`${url}/statistic`, {
    params,
  });
}

// http://127.0.0.1:8000/tenant/tag/analytics/word-cloud
export async function queryWordCloudRule(): Promise<any> {
  return request(`${url}/analytics/word-cloud`);
}

export async function exportWordCloudRule(): Promise<any> {
  return request(`${url}/analytics/export-word-cloud`);
}

export async function queryUserListRule(): Promise<any> {
  return request(`${url}/user-list`);
}
export async function exportUserListRule(): Promise<any> {
  return request(`${url}/export-user-list`);
}
