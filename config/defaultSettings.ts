import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  fixedHeader: false,
  fixSiderbar: true,
  layout: ' ',
  splitMenus: true,
  menu: {
    type: 'group',
    defaultOpenAll: true,
    ignoreFlatMenu: true,
  },
  collapsed: false,
  siderWidth: 208,
  disableContentMargin: false,
  collapsedButtonRender: false,
};

export default Settings;
