import { createRef } from 'react';
import { history, Link, useLocation, useAccess } from '@umijs/max';
import NoPermission from '@/pages/403';
import obtainAuthRoutes from '@/utils/obtainAuthRoutes';

import Footer from './Footer';
import Logo from './Logo';
import { LeftContent, RightContent } from './Header';
import getOpenKeys from '../../../config/routes/getOpenKeys';
import { dynamicMenu } from '../../../config/routes/dynamic';
import fixMenuItemIcon from './fixMenuItemIcon';

export const layoutActionRef = createRef<any>();

/**需要忽略layout的页面
 *
 * 临时解决方案，最佳方案应该是 routes 的一个配置
 *
 */
const pureReg = [
  '^/workbench/material/forms/.*?/(edit|edit/)$', // 表单库
  '^/workbench/application/project/landing/.*?/(edit|edit/)$', // landing编辑
  '^/workbench/operation/push/mail/(content|content/)$', // 推送编辑页面
];

const getPure = (location: any) => {
  let pure = false;
  pureReg.forEach((item) => {
    if (new RegExp(item).test(location.pathname)) {
      pure = true;
    }
  });
  return pure;
};

const layout: any = ({ initialState }: any) => {
  const location = useLocation();
  const access = useAccess();

  return {
    pure: getPure(location),
    className: 'reset-extra',
    ...initialState?.settings,
    actionRef: layoutActionRef,
    menu: {
      type: 'group',
      loading: false,
      request: async (_: any, defaultMenuData: any) => {
        let menuData = obtainAuthRoutes(access, dynamicMenu);
        return menuData?.length ? menuData : defaultMenuData;
      },
    },
    menuProps: {
      className: 'reset-pro-layout-menu',
      openKeys: getOpenKeys(),
      autoClose: false,
    },
    onPageChange: () => {
      if (!initialState?.currentUser && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    unAccessible: <NoPermission />,
    menuHeaderRender: () => <Logo />,
    menuDataRender: (menusData: any) => fixMenuItemIcon(menusData),
    menuItemRender: (menuItemProps: any, defaultDom: any) => {
      if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
        return defaultDom;
      }
      return <Link to={`${menuItemProps.path}${location.search}`}>{defaultDom}</Link>;
    },
    rightContentRender: () => <RightContent />,
    headerContentRender: () => <LeftContent />,
    footerRender: () => <Footer />,
  };
};

export default layout;
