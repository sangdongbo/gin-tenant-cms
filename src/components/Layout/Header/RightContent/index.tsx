import { Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import React from 'react';
import { history, useModel } from '@umijs/max';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  };

  return (
    <Space className={className}>
      <span className={styles.action} onClick={() => history.push('/settings/account/basic')}>
        <SettingOutlined style={{ fontSize: 20 }} />
      </span>
      <Avatar menu={true} />
    </Space>
  );
};
export default GlobalHeaderRight;
