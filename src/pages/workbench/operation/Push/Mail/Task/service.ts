import { request } from '@umijs/max';

const url = API_URL + '/tenant/push/mail/template/task';

export async function queryRule(params?: any): Promise<any> {
  return request(url, {
    params,
  });
};

export async function addRule(options?: Record<string, any>) {
  return request(url, {
    method: 'POST',
    data: {
      ...options,
    },
  });
};

export async function updateRule(id: any,options: { [key: string]: any }) {
  return request(`${url}/${id}`, {
    method: 'PUT',
    data: {
      ...options,
    },
  });
}

export async function removeRule(id: string) {
  return request(`${url}/${id}`, {
    method: 'DELETE',
  });
}


export async function updateTaskStatusRule(id: any,options: { [key: string]: any }) {
  return request(`${url}/${id}/status`, {
    method: 'POST',
    data: {
      ...options,
    },
  });
}



export async function addCustomFileRule(id: any, options?: { [key: string]: any }) {
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

  return request(`${url}/${id}/upload`, {
    method: 'POST',
    data,
  });
}

// export async function queryCustomFileRule(params?: { [key: string]: any }) {
//   return request(`${url}/upload`, {
//     params,
//   });
// }
