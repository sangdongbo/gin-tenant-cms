import { request } from '@umijs/max';

const url = API_URL + '/tenant/project/event';
const dataDownloadUrl = API_URL + '/tenant/project/data-download';
const fieldsUrl = API_URL + '/tenant/project/contacts/fields';
const wechatTemplate = API_URL + '/tenant/wechat/template';

export async function addRule(data: { [key: string]: any }) {
  return request(url, {
    method: 'POST',
    data: data,
  });
}

export async function queryRule(params?: { [key: string]: any }) {
  return request(url, {
    params,
  });
}
export async function getRule(id: any) {
  return request(`${url}/${id}`);
}
export async function removeRule(id: number) {
  return request(`${url}/${id}`, {
    method: 'DELETE',
  });
}

export async function queryAllRule(params?: { [key: string]: any }) {
  return request(`${url}/all`, {
    params,
  });
}

export async function getConfigRule(id: any) {
  return request(`${url}/config/${id}`);
}
export async function addConfigRule(data: { [key: string]: any }) {
  return request(`${url}/config`, {
    method: 'POST',
    data,
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


export async function updateConfigModuleRule(data: any) {
  return request(`${url}/config/module`, {
    method: 'POST',
    data,
  });
}


export async function addInfoRule(data: { [key: string]: any }) {
  return request(`${url}/info`, {
    method: 'POST',
    data,
  });
}
export async function getInfoRule(id: number) {
  return request(`${url}/info/${id}`);
}


export async function addScheduleSaveListRule(data: { [key: string]: any }) {
  return request(`${url}/schedule/save-list`, {
    method: 'POST',
    data,
  });
}
export async function queryScheduleAllRule(params: { [key: string]: any }) {
  return request(`${url}/schedule/all`, {
    params,
  });
}


export async function addSpeakerSaveListRule(data: { [key: string]: any }) {
  return request(`${url}/speaker/save-list`, {
    method: 'POST',
    data,
  });
}
export async function querySpeakerAllRule(params: { [key: string]: any }) {
  return request(`${url}/speaker/all`, {
    params,
  });
}


export async function addLiveRule(data: { [key: string]: any }) {
  return request(`${url}/live`, {
    method: 'POST',
    data,
  });
}
export async function queryLiveRule(id: number) {
  return request(`${url}/live/${id}`);
}


export async function addFieldsUrlEventRule(data: { [key: string]: any }) {
  return request(`${fieldsUrl}/event`, {
    method: 'POST',
    data,
  });
}
export async function queryFieldsUrlEventRule(id: number) {
  return request(`${fieldsUrl}/event/${id}`);
}


export async function addDataDownloadSaveListRule(data: { [key: string]: any }) {
  return request(`${dataDownloadUrl}/save-list`, {
    method: 'POST',
    data,
  });
}
export async function queryDataDownloadTreeRule(params: { [key: string]: any }) {
  return request(`${dataDownloadUrl}/tree`, {
    params,
  });
}



export async function addAddressRule(data: { [key: string]: any }) {
  return request(`${url}/address`, {
    method: 'POST',
    data,
  });
}
export async function queryAddressRule(id: number) {
  return request(`${url}/address/${id}`);
}

export async function addWechatTemplateRule(data: { [key: string]: any }) {
  return request(`${wechatTemplate}/event`, {
    method: 'POST',
    data,
  });
}

export async function queryWechatTemplateRule(params: { [key: string]: any }) {
  return request(wechatTemplate, {
    params,
  });
}
