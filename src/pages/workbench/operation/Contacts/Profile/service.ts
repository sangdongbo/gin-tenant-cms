import { request } from '@umijs/max';

const url = API_URL + '/tenant/contacts/analytics';

export async function queryRule(params?: any): Promise<any> {
  return request(url, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// /tenant/contacts/analytics/tag-top/

export async function querySearchResultGroup(params?: any): Promise<any> {
  return request(`${url}/search-result-group`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(options?: { [key: string]: any }) {
  return request(`${url}/${options.id}`, {
    method: 'PUT',
    data: {
      ...options,
    },
  });
}

export async function queryTagTopRule(id: number): Promise<any> {
  return request(`${url}/tag-top/${id}`);
}

export async function queryOpenidRule(id: number): Promise<any> {
  return request(`${url}/openid/${id}`);
}

export async function queryTagsRule(params?: any): Promise<any> {
  return request(`${url}/tag/user-list`, {
    params,
  });
}

export async function queryAuthRule(params?: any): Promise<any> {
  const id = params.id;
  delete params.id;
  return request(`${url}/auth/${id}`, {
    params,
  });
}

export async function queryGroupRelationRule(params?: any): Promise<any> {
  return request(`${url}/group-relation`, {
    params,
  });
}
export async function updateGroupRelationRule(options: { [key: string]: any }) {
  return request(`${url}/group-relation/${options.id}`, {
    method: 'PUT',
    data: {
      ...options,
    },
  });
}
export async function removeGroupRelationRule(user_id: number, group_id: number) {
  return request(`${url}/group-relation/${user_id}/${group_id}`, {
    method: 'DELETE',
  });
}

export async function queryTagRelationRule(params?: any): Promise<any> {
  return request(`${url}/tag-relation`, {
    params,
  });
}
export async function updateTagRelationRule(options: { [key: string]: any }) {
  return request(`${url}/tag-relation/${options.id}`, {
    method: 'PUT',
    data: {
      ...options,
    },
  });
}
export async function removeTagRelationRule(user_id: number, tag_id: number) {
  return request(`${url}/tag-relation/${user_id}/${tag_id}`, {
    method: 'DELETE',
  });
}

export async function queryTimelineRule(id: number): Promise<any> {
  return request(`${url}/timeline/${id}`);
}

export async function queryAsyncRule(): Promise<any> {
  return request(`${url}/async`);
}

export async function queryStatisticRule(params?: any): Promise<any> {
  return request(`${url}/statistic`, {
    params,
  });
}
