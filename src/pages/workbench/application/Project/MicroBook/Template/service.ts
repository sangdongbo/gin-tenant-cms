import { request } from '@umijs/max';

const url = API_URL + '/tenant/project/microbook';

export async function queryRule(params?: { [key: string]: any }) {
  return request(`${url}/category`, {
    params,
  });
}
export async function getRule(id: number, params?: any) {
  return request(`${url}/category/${id}`, { params });
}
export async function addRule(data: { [key: string]: any }) {
  return request(`${url}/category`, {
    method: 'POST',
    data: data,
  });
}
export async function updateRule(params: any) {
  return request(`${url}/category/${params.id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function queryAggregationRule(params?: any) {
  return request(`${url}/category/aggregation`, { params });
}

export async function sortRule(data: { [key: string]: any }) {
  return request(`${url}/category/sort`, {
    method: 'POST',
    data: data,
  });
}
export async function removeRule(id: number) {
  return request(`${url}/category/${id}`, {
    method: 'DELETE',
  });
}

export async function queryArticleRule(params?: { [key: string]: any }) {
  return request(`${url}/article`, {
    params,
  });
}
export async function addArticleRule(data: { [key: string]: any }) {
  return request(`${url}/article`, {
    method: 'POST',
    data: data,
  });
}
export async function removeArticleRule(id: number) {
  return request(`${url}/article/${id}`, {
    method: 'DELETE',
  });
}
export async function sortArticleRule(data: { [key: string]: any }) {
  return request(`${url}/article/sort`, {
    method: 'POST',
    data: data,
  });
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


// export async function queryConfigRule(id: number) {
//   return request(`${url}/config/${id}`);
// }
// export async function updateConfigRule(data: { [key: string]: any }) {
//   return request(`${url}/config`, {
//     method: 'POST',
//     data: data,
//   });
// }
