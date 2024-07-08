import { getUid } from './uuid';
import getUrlName from './getUrlName';

interface FetchPdfAsFileType {
  url: string;
  fileName?: string;
}

const fetchPdfAsFile = ({ url, fileName }: FetchPdfAsFileType) => {
  return new Promise<any>((resolve, reject) => {
    if (url) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';

      xhr.onload = function () {
        if (xhr.status === 200) {
          const blob = xhr.response;
          // 目前暂时只有pdf
          const file = new File([blob], fileName || getUrlName(url) || `${getUid()}.pdf`, {
            type: 'application/pdf',
          });

          resolve({
            file,
          });
        }
      };
      xhr.send();
    } else {
      reject();
    }
  });
};

export default fetchPdfAsFile;
