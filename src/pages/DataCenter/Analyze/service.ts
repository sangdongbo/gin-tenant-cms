import { request } from '@umijs/max';

const url = API_URL + '/tenant/data-center/project-analytics';

export async function getOverviewRule(data?: any): Promise<any> {
  return request(`${url}/overview`, {
    method: 'POST',
    data,
  });
};

export async function getProjectDataRule(data?: any): Promise<any> {
  return request(`${url}/project-data`, {
    method: 'POST',
    data,
  });
};

export async function getTimelineRule(data?: any): Promise<any> {
  return request(`${url}/timeline`, {
    method: 'POST',
    data,
  });
};

export async function getChannelDataRule(data?: any): Promise<any> {
  return request(`${url}/channel-data`, {
    method: 'POST',
    data,
  });
};


export async function getFirstRegisterRule(data?: any): Promise<any> {
  return request(`${url}/first-register`, {
    method: 'POST',
    data,
  });
};
