import { message, Upload } from 'antd';

/**
 * file: 文件
 * accept: ['.png'] 禁止使用.PNG大写
*/
const beforeUpload = (file: any, accept: string[]) => {
  const fileName = file.name;
  const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

  if (accept.includes("." + fileExtension.toLowerCase())) {
    return true; // 允许上传
  } else {
    message.error(`禁止上传.${fileExtension}文件。`);
    return Upload.LIST_IGNORE; // 阻止上传
  };
};
export default beforeUpload;
