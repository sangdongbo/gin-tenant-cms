import { request } from '@umijs/max';
import { isString } from 'lodash';

const upload = (file: any, app_source: string = 'tmp', config?: any) => {
  const formData = new FormData();

  formData.append('app_source', app_source);
  formData.append('file', file, file.name);

  return request(`${API_URL}/tenant/system/resource`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('lookstar-tenant-token')}`,
      'X-Tenant': localStorage.getItem('lookstar-tenant-X-Tenant'),
      'X-Requested-With': null,
    },
    data: formData,
    ...config,
  });
};

export const update = (file: any, options?: any, config?: any) => {
  const formData = new FormData();

  let app_source: any = options || 'tmp';
  if (!isString(options)) {
    app_source = options?.app_source || 'tmp';

    if (options?.update_url) formData.append('url', options?.update_url);
  }
  console.log('options----', options);
  formData.append('app_source', app_source);
  formData.append('file', file, file.name);

  return request(`${API_URL}/tenant/system/resource/update`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('lookstar-tenant-token')}`,
      'X-Tenant': localStorage.getItem('lookstar-tenant-X-Tenant'),
      'X-Requested-With': null,
    },
    data: formData,
    ...config,
  });
};

export default upload;
