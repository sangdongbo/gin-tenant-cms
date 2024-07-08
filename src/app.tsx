import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { message } from 'antd';
import NProgress from 'nprogress';
import defaultSettings from '../config/defaultSettings';
import 'nprogress/nprogress.css';
import 'regenerator-runtime/runtime';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { getConfigRule } from './pages/DataCenter/Lifecycle/service';
import { querySelectRule } from './pages/workbench/operation/WeChat/Authorizer/service';
import { getServiceRule } from './pages/settings/system/config/Mail/service';
import { errcode } from './utils/errcode';
import baseLayout, { layoutActionRef as baseLayoutActionRef } from '@/components/Layout';
import theme from '../config/theme';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

export function render(oldRender: () => void) {
  // 因为后期会有国家化，所以目前保留国际化，语言强制转为中文。
  oldRender();
}

NProgress.configure({
  template: `<div class="bar" role="bar" style="background-color: ${theme.primaryColor}"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`,
});
NProgress.start();
export function onRouteChange(next: any, to: any) {
  NProgress.done();
  try {
    baseLayoutActionRef?.current?.reload();
  } catch (error) { }
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: any;
  dataCustomization?: any;
  authorizer?: any;
  fetchUserInfo?: () => Promise<any | undefined>;
  fetchInit?: () => Promise<any | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser: any = await queryCurrentUser();

      if (currentUser.errcode == 1) history.push('/user/login');

      return currentUser;
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };
  const fetchConfigRule = async () => {
    try {
      const dataCustomization: any = await getConfigRule();
      return dataCustomization;
    } catch (error) { }
    return undefined;
  };
  const fetchAuthorizerRule = async () => {
    try {
      const authorizer: any = await querySelectRule();
      return authorizer;
    } catch (error) { }
    return undefined;
  };
  const fetchServiceRule = async (type: string) => {
    try {
      const authorizer: any = await getServiceRule(type);
      return authorizer;
    } catch (error) { }
    return undefined;
  };

  // 初始化
  const fetchInit = async () => {
    const dataCustomization = await fetchConfigRule();
    const authorizer = await fetchAuthorizerRule();
    const mailCofing = await fetchServiceRule('mail');
    const smsCofing = await fetchServiceRule('sms');

    return {
      dataCustomization,
      authorizer,
      mailCofing,
      smsCofing,
    };
  };

  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login' && history.location.pathname !== '/user/login/') {
    if (localStorage.getItem('lookstar-tenant-token')) {
      const currentUser = await fetchUserInfo();
      const resData = await fetchInit();
      if (currentUser?.is_active == 0) {
        message.error('此账号已停用，请联系管理员');
        history.push('/user/login');
      }
      if (currentUser)
        return {
          fetchUserInfo,
          fetchInit,
          currentUser,
          ...resData,
          settings: defaultSettings as Partial<LayoutSettings>,
        };
    } else {
      history.push('/user/login');
    }
  }

  return {
    fetchUserInfo,
    fetchInit,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const layout: RunTimeLayoutConfig = baseLayout;

// 错误提示不连续提示
let notMessage = false;
const handlerMessage = (options: any) => {
  if (notMessage) return;
  notMessage = true;
  message.error(options).then(() => {
    notMessage = false;
  });
};

/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = (error: any) => {
  const { response }: any = error;

  if (error?.errcode) {
    const currentErrcode = errcode[error.errcode];
    let errcodeValue = currentErrcode;

    if (typeof errcodeValue === 'object') {
      errcodeValue = JSON.parse(JSON.stringify(currentErrcode));
      if (errcodeValue.hideNotification) {
        throw error;
      } else {
        errcodeValue = errcodeValue.message;
      }
    }

    if (errcodeValue && typeof currentErrcode !== 'object') {
      handlerMessage(errcodeValue);
    } else if (typeof error.errmsg === 'object') {
      const keys = Object.keys(error.errmsg);
      const _errcodeValue = currentErrcode[keys[0]] || error.errmsg[keys[0]];

      handlerMessage(_errcodeValue);
    } else {
      handlerMessage(error.errmsg || '网络异常');
    }
    throw error;
  }

  if (response && response.status) {
    const { status } = response;
    handlerMessage(`请求错误 ${status}`);
    if (status == 401) {
      history.push('/user/login');
    }
  }

  if (!response && error?.type != 'AbortError') {
    handlerMessage('您的网络发生异常，无法连接服务器');
  }

  throw error;
};

const requestInterceptors = [
  (url: any, options: any) => {
    let headers = {};
    if (localStorage.getItem('lookstar-tenant-token')) {
      headers = {
        Authorization: `Bearer ${localStorage.getItem('lookstar-tenant-token')}`,
        'X-Tenant': localStorage.getItem('lookstar-tenant-X-Tenant'),
      };
    }

    return {
      url,
      options: { ...options, headers },
    };
  },
];

const responseInterceptors = [
  (response: any) => {
    if (response?.data?.errcode) {
      throw response?.data || response;
    }
    return response;
  },
];

export const request: RequestConfig = {
  errorConfig: {
    errorHandler,
  },
  requestInterceptors,
  responseInterceptors,
};
