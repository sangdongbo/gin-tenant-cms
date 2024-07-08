const urlToBase64 = (url: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    // 先设置图片跨域属性
    image.crossOrigin = 'Anonymous';
    // 再给image赋值src属性，先后顺序不能颠倒

    image.src = url;
    image.onload = function () {
      const canvas: any = document.createElement('canvas');
      // 设置canvas宽高等于图片实际宽高
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext('2d').drawImage(image, 0, 0);
      let dataURL = canvas.toDataURL('image/jpeg');
      resolve(dataURL);
    };
    image.onerror = () => {
      reject({ message: '相片处理失败' });
    };
  });
};

function base64ImgtoFile(dataurl: string, filename = 'file') {
  //将base64格式分割：['data:image/png;base64','XXXX']
  const arr: any[] = dataurl.split(',');
  // .*？ 表示匹配任意字符到下一个符合条件的字符 刚好匹配到：
  // image/png
  const mime = arr[0].match(/:(.*?);/)[1]; //image/png
  //[image,png] 获取图片类型后缀
  const suffix = mime.split('/')[1]; //png
  const bstr = atob(arr[1]); //atob() 方法用于解码使用 base-64 编码的字符串
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime,
  });
}

export const getBase64URL = (base64: string) => {
  const blob = base64ImgtoFile(base64);
  const blobUrl = window.URL.createObjectURL(blob);
  return blobUrl;
};

export default urlToBase64;
