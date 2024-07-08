import { request } from '@umijs/max';

// 127.0.0.1:8000/tenant/push/mail/template/1
const url = API_URL + '/tenant/push/mail/template';

export async function addRule(options?: Record<string, any>) {
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
  return request(url, {
    method: 'POST',
    data,
  });
}

export async function queryRule(params?: any): Promise<any> {
  return request(url, {
    params,
  });
}

export async function updateRule(id: any, options: { [key: string]: any }) {
  return request(`${url}/${id}`, {
    method: 'PUT',
    data: {
      ...options,
    },
  });
}

export async function addUploadEditRule(id: any, options: { [key: string]: any }) {
  return request(`${url}/${id}/upload-edit`, {
    method: 'POST',
    data: {
      ...options,
    },
  });
}

export async function addUploadHtmlRule(id: any, options: { [key: string]: any }) {
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
  return request(`${url}/${id}/upload-html`, {
    method: 'POST',
    data,
  });
}

export async function getRule(id?: any): Promise<any> {
  return request(`${url}/${id}`);
}


export async function addPreviewRule(id: any,options?: { [key: string]: any }) {
  return request(`${url}/${id}/preview`, {
    method: 'POST',
    data: {
      ...options,
    },
  });
}
