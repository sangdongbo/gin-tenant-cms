const checkPwd = (msg: any) => {
  //判断含有数字字母特殊符号
  let lvl = 0;
  if (msg.match(/[0-9]/)) {
    lvl++;
  }
  if (msg.match(/[a-zA-Z]/)) {
    lvl++;
  }
  if (msg.match(/[^0-9a-zA-Z]/)) {
    lvl++;
  }
  if (msg.length < 9) {
    lvl--;
  }
  return lvl;
};
export default checkPwd; // 密码强度
