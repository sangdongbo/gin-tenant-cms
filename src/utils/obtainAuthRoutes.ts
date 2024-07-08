import { history } from '@umijs/max';

// 判断当前菜单是否有权限
const menuAuth = (menus: any[], access: any) => {
  const menu = menus.filter((item: any) => {
    let auth = true;
    if (access?.[item.access]) {
      auth = !!access?.[item.access]();
    }
    if (item?.routes && auth) {
      item.routes = menuAuth(item.routes, access);
    }
    return auth;
  });
  return menu;
};

// 获取当前页面数据
export default (access: any, routes: any[]) => {
  const {
    location: { pathname },
  } = history;
  const currentData =
    routes?.filter((item: any) => {
      if (new RegExp(item.reg).test(pathname)) {
        return true;
      }
      return false;
    }) || [];
  const menus = menuAuth(currentData, access);
  return menus;
};
