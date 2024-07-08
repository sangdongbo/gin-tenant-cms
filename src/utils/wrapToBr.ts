/**
 * 转换回车换行为br标签
 * @param string
 * @returns {*}
 */
const wrapToBr = (string: string) => {
  try {
    string = string.replace(/\r\n/g, '<br>');
    string = string.replace(/\n/g, '<br>');
    string = string.replace(/\r/g, '<br>');
  } catch (e: any) {
    console.error(e.message);
  }
  return string;
};

export default wrapToBr;
