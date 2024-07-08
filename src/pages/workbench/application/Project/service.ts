import { request } from '@umijs/max';

const url = API_URL + '/tenant/project';

export async function getCity(): Promise<any> {
  return request('https://lookstar.oss-cn-beijing.aliyuncs.com/static/json/address.json');
}

export async function queryRule(params?: { [key: string]: any }) {
  return request(url, {
    params,
  });
}
export async function getRule(id: number, params?: any) {
  return request(`${url}/${id}`, { params });
}
export async function addRule(data: { [key: string]: any }) {
  return request(`${url}`, {
    method: 'POST',
    data: data,
  });
}

export async function deleteRule(id: number) {
  return request(`${url}/${id}`, {
    method: 'DELETE',
  });
}

export async function querySelectRule(params?: { [key: string]: any }) {
  return request(`${url}/select`, {
    params,
  });
}

export async function queryBasicRule(project_id: any, options?: any) {
  return request(`${url}/id/${project_id}`, {
    ...options,
  });
}
export async function addBasicRule(data: { [key: string]: any }) {
  return request(`${url}/${data.project_id}`, {
    method: 'POST',
    data: data,
  });
}
export async function updateBasicRule(id: number, data?: { [key: string]: any }) {
  return request(`${url}/${id}`, {
    method: 'PUT',
    data: data,
  });
}

export async function queryContactsRule(params?: any): Promise<any> {
  return request(`${url}/contacts`, {
    params,
  });
}

export async function updateContactsRule(id: any, data?: { [key: string]: any }) {
  return request(`${url}/contacts/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function getContactsFieldsRule(id: number) {
  return request(`${url}/contacts/fields/${id}`);
}

export async function addContactsFieldsRule(data: { [key: string]: any }) {
  return request(`${url}/contacts/fields`, {
    method: 'POST',
    data: data,
  });
}

export async function queryContactsConfigRule(params: { [key: string]: any }) {
  return request(`${url}/contacts/config`, {
    params,
  });
}
export async function getContactsConfigRule(id: number) {
  return request(`${url}/contacts/config/${id}`);
}
export async function addContactsConfigRule(data: { [key: string]: any }) {
  return request(`${url}/contacts/config`, {
    method: 'POST',
    data: data,
  });
}

export async function queryChannelRule(params: { [key: string]: any }) {
  return request(`${url}/channel`, {
    params,
  });
}
export async function queryChannelRuleAll(params: { [key: string]: any }) {
  return request(`${url}/channel/all`, {
    params,
  });
}
export async function addChannelRule(data: { [key: string]: any }) {
  return request(`${url}/channel`, {
    method: 'POST',
    data: data,
  });
}
export async function updateChannelRule(id: number, data?: { [key: string]: any }) {
  return request(`${url}/channel/${id}`, {
    method: 'PUT',
    data: data,
  });
}

export async function deleteChannelRule(id: number) {
  return request(`${url}/channel/${id}`, {
    method: 'DELETE',
  });
}

export async function queryLandingEditRule(project_id: any) {
  return request(`${url}/landing/edit-runtime/${project_id}`);
}
export async function addLandingEditRule(data: { [key: string]: any }) {
  return request(`${url}/landing/edit-runtime`, {
    method: 'POST',
    data: data,
  });
}

export async function queryFormConfigRule(project_id: any) {
  return request(`${url}/form/${project_id}`);
}
export async function queryFormRule(project_id: any) {
  return request(`${url}/form/${project_id}`);
}
export async function createConfigRule(data: { [key: string]: any }) {
  return request(`${url}/config`, {
    method: 'POST',
    data: data,
  });
}

export async function getConfigRule(id: number) {
  return request(`${url}/config/${id}`);
}

export async function queryBannerRule(params?: { [key: string]: any }) {
  return request(`${url}/banner`, {
    params,
  });
}
export async function addBannerRule(data: { [key: string]: any }) {
  return request(`${url}/banner`, {
    method: 'POST',
    data: data,
  });
}
export async function removeBannerRule(id: number) {
  return request(`${url}/banner/${id}`, {
    method: 'DELETE',
  });
}
export async function sortBannerRule(data: { [key: string]: any }) {
  return request(`${url}/banner/sort`, {
    method: 'POST',
    data: data,
  });
}
export async function updateBannerRule(params: any) {
  return request(`${url}/banner/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function queryCampaignRatioRule(params?: { [key: string]: any }) {
  return request(`${url}/analytics/campaign-ratio`, {
    params,
  });
}

export async function queryFolderRule(params?: { [key: string]: any }) {
  return request(`${url}/folders`, {
    params,
  });
}

export async function addFolderRule(data: { [key: string]: any }) {
  return request(`${url}/folders`, {
    method: 'POST',
    data: data,
  });
}

export async function removeFolderRule(id: number | string) {
  return request(`${url}/folders/${id}`, {
    method: 'DELETE',
  });
}

export async function queryFolderAllRule(params?: { [key: string]: any }) {
  return request(`${url}/folders/all`, {
    params,
  });
}

export async function sortFolderRule(data: { [key: string]: any }) {
  return request(`${url}/folders/sort`, {
    method: 'POST',
    data,
  });
}

export async function queryGetFolderSelectRule(params?: { [key: string]: any }) {
  return request(`${url}/folders/get-folders-select`, {
    params,
  });
}

export async function copyRule(id: number | string) {
  return request(`${url}/copy/${id}`);
}
