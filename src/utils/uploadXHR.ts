

interface UploadXHRType {
  file?: any;
  app_source: string;
  onProgress?: (options: any) => void;
};

const uploadXHR = ({
  file,
  app_source,
  onProgress,
}: UploadXHRType) => {
  return new Promise((resolve, reject) => {
    const xhrRequest = new XMLHttpRequest();
    xhrRequest.open('POST', `${API_URL}/tenant/system/resource`);
    xhrRequest.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('lookstar-tenant-token')}`);
    xhrRequest.setRequestHeader('X-Tenant', localStorage.getItem('lookstar-tenant-X-Tenant') || '');
    // xhrRequest.setRequestHeader('X-Requested-With', '');
    xhrRequest.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percent = Math.floor((event.loaded * 100) / event.total);
        onProgress?.({ percent });
      }
    });
    xhrRequest.addEventListener('load', () => {
      if (xhrRequest.status === 200) {
        resolve(xhrRequest.responseText);
      } else {
        reject(new Error(xhrRequest.statusText));
      };
    });
    xhrRequest.addEventListener('error', () => reject(new Error('上传失败。')));
    const formData = new FormData();
    formData.append('app_source', app_source);
    formData.append('file', file, file.name);
    xhrRequest.send(formData);
  });
};

export default uploadXHR;
