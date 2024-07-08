const isImage = (url: string) => {
  return new Promise<void>((resolve, reject) => {
    var img = new Image();
    img.onload = function () {
      resolve();
    };
    img.onerror = function () {
      reject();
    };
    img.src = url;
  });
};

export default isImage;
