import { request } from '@umijs/max';

const url = API_URL + '/tenant/system';

export async function addFeedbackRule(params: any) {
  return request(`${url}/feedback`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
