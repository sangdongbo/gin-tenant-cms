import { request } from '@umijs/max';

const url = API_URL + '/tenant/ai/gpt';

// /tenant/ai/gpt/repository-data/access-token

export async function getProjectWechatRule(params?: any): Promise<any> {
  return request(`${url}/project/wechat`, {
    params,
  });
}

export async function getConfigRule(id: any, params?: any): Promise<any> {
  return request(`${url}/config/${id}`, {
    params,
  });
}

export async function updateConfigDownloadRule(id: number, data?: { [key: string]: any }) {
  return request(`${url}/config/download/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function addConfigRule(data: { [key: string]: any }) {
  return request(`${url}/config`, {
    method: 'POST',
    data: data,
  });
}

export async function getConfigPromptRule(id: any, params?: any): Promise<any> {
  return request(`${url}/config/prompt/${id}`, {
    params,
  });
}

export async function addConfigPromptRule(data: { [key: string]: any }) {
  return request(`${url}/config/prompt`, {
    method: 'POST',
    data: data,
  });
}

export async function queryOffiaccountAllRule(params?: any) {
  return request(`${url}/repository-data/offiaccount`, {
    params,
  });
}

export async function syncRule(id: any, params?: any): Promise<any> {
  return request(`${url}/repository-data/sync/${id}`, {
    params,
  });
}

export async function syncPartRule(id: any, data?: any): Promise<any> {
  return request(`${url}/repository-data/sync-part/${id}`, {
    method: 'POST',
    data,
  });
}

export async function addRepositoryDataRule(data: { [key: string]: any }) {
  return request(`${url}/repository-data`, {
    method: 'POST',
    data: data,
  });
}

export async function queryRepositoryDataRule(params?: any) {
  return request(`${url}/repository-data`, {
    params,
  });
}

export async function updateRepositoryDataRule(id: number, data?: { [key: string]: any }) {
  return request(`${url}/repository-data/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function removeRepositoryDataRule(id: number) {
  return request(`${url}/repository-data/${id}`, {
    method: 'DELETE',
  });
}

export async function removeRepositoryDataFreepublishRule(
  id: number,
  data?: { [key: string]: any },
) {
  return request(`${url}/repository-data/freepublish/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function getRepositoryDataRestoreFreepublishRule(id: number, params?: any) {
  return request(`${url}/repository-data/restore-freepublish/${id}`, {
    params,
  });
}

export async function getRepositoryDataAccessTokenRule(params?: any): Promise<any> {
  return request(`${url}/repository-data/access-token`, {
    params,
  });
}

export async function addDocConvertMDRule(data: { [key: string]: any }) {
  return request(`${url}/repository-data/doc-convert-md`, {
    method: 'POST',
    data,
  });
}

export async function addRepositoryDataAzureDocConvertRule(options: { [key: string]: any }) {
  const data = new FormData();
  if (options?.pdf) {
    data.append('pdf', options?.pdf);
    delete options['pdf'];
  }

  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      data.append(key, options[key]);
    }
  }

  return request(`${url}/repository-data/azure-doc-convert`, {
    method: 'POST',
    data,
  });
}

export async function getRepositoryDataDocConvertRule(id: any, data?: any): Promise<any> {
  return request(`${url}/repository-data/doc-convert-result/${id}`, {
    method: 'POST',
    data,
  });
}

export async function getRepositoryDataFilePreviewRule(data?: any): Promise<any> {
  return request(`${url}/repository-data/file-preview`, {
    method: 'POST',
    data,
  });
}

export async function getRepositoryDataFreepublishAllRule(id: any, data?: any): Promise<any> {
  return request(`${url}/repository-data/freepublish-all/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function getRepositoryDataRestoreAllFreepublishRule(id: any, params?: any) {
  return request(`${url}/repository-data/restore-all-freepublish/${id}`, {
    params,
  });
}
