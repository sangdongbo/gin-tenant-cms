import { request } from '@umijs/max';

const url: string = API_URL + '/tenant/group';

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

export async function getRule(id: string) {
  return request(`${url}/${id}`);
};


export async function getAsyncTotalRule(id: string) {
  return request(`${url}/${id}`);
};

export async function getTotalRule(options?: Record<string, any>) {
  return request(`${url}/total`, {
    method: 'POST',
    data: {
      ...options,
    },
  });
};

export async function queryUserInfoRule(params?: any): Promise<any> {
  return request(`${url}/user-info`, {
    params,
  });
}

export async function updateTotalRule(id: string) {
  return request(`${url}/total/${id}`);
};

export async function updateRule(id: number, options?: Record<string, any>) {
  return request(`${url}/${id}`, {
    method: 'PUT',
    data: {
      ...options,
    },
  });
}

export async function queryAllRule(params?: any): Promise<any> {
  return request(`${url}/all`, {
    params,
  });
}

export async function removeRule(id: string) {
  return request(`${url}/${id}`, {
    method: 'DELETE',
  });
}

export async function querySelectRule(params?: any): Promise<any> {
  return request(`${url}/select`, {
    params,
  });
}







// export async function queryUserSourceCountRule(params?: any): Promise<any> {
//   return request(`${url}/user-source-count`, {
//     params,
//   });
// }

// export async function addMergeRule(options?: Record<string, any>) {
//   return request(`${url}/merge`, {
//     method: 'POST',
//     data: {
//       ...options,
//     },
//   });
// }
