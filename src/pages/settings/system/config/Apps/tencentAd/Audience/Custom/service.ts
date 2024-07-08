import { request } from '@umijs/max';

const url: string = API_URL + '/tenant/ads/tencent/audiences/custom';

export async function queryCustomRule(params?: { [key: string]: any }) {
  return request(`${url}`, {
    params,
  });
}

export async function addCustomRule(options?: { [key: string]: any }) {
  return request(`${url}`, {
    method: 'POST',
    data: {
      ...options,
    },
  });
}

export async function removeCustomRule(id: number) {
  return request(`${url}/${id}`, {
    method: 'DELETE',
  });
}

export async function addCustomFileRule(options?: { [key: string]: any }) {
  const data = new FormData();
  if (options?.file) {
    data.append('file', options?.file[0].originFileObj);
    delete options['file'];
  }
  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      data.append(key, options[key]);
    }
  }

  return request(`${url}/file`, {
    method: 'POST',
    data,
  });
}

export async function queryCustomFileRule(params?: { [key: string]: any }) {
  return request(`${url}/file`, {
    params,
  });
}
