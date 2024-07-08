import { wechatMenuErrorCodeMessage } from './wechatMenuErrorCode';

const handelWechatMenuErrorCode = () => {
  const obj: any = {};
  const wechatMenuErrorCodeKeys = Object.keys(wechatMenuErrorCodeMessage);
  wechatMenuErrorCodeKeys.forEach((item) => {
    obj[item] = {
      hideNotification: true,
    };
  });
  return obj;
};

export const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '登录超时，请重新登录。',
  403: '暂无权限，请联系管理员',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export const errcode = {
  ...codeMessage,
  // 45064: {
  //   hideNotification: true,// 是否隐藏错误通知
  //   message: '创建菜单包含未关联的小程序',
  // },
  ...handelWechatMenuErrorCode(),
  10101: {
    hideNotification: true, // 是否隐藏错误通知
    message: '账户锁定',
  },
  10102: {
    hideNotification: true,
    message: '账户停用',
  },
  10103: {
    hideNotification: true,
    message: '账户或密码不正确', // 账户不存在
  },
  10104: '绑定失败',
  10105: '绑定失败',
  10106: '修改密码失败',
  10107: '获取解绑验证码失败',
  10108: {
    hideNotification: true,
    message: '账户或密码不正确', // 密码不正确
  },
  10109: '账号已存在，请重新输入',
  // 10201: '验证码错误',
  10202: '验证码超过发送频率',
  10301: '资源不存在',
  10401: {
    appid: '请选择公众号',
    name: '该名称已被使用',
    message:'参数错误',
  },
};

// 通过errcodecode码获取对应message
export const getErrcodeMessage = (code: number) => {
  const errcodeValue = errcode[code] || '网络异常';
  if (typeof errcodeValue === 'object') {
    return errcodeValue.message;
  }
  return errcodeValue;
};
