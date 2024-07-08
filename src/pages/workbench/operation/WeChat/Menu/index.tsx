import { useState, useEffect } from 'react';
import { Link } from '@umijs/max';

import { addMeta, deleteMeta } from '@/utils/meta';
import ProCard from '@/components/BaseComponents/ProCard';

import Select from '@/pages/workbench/operation/WeChat/Authorizer/Components/Select';

import Config from './Config';

import styles from './style.less';

export default () => {
  const [appid, setAppid] = useState<string>();

  useEffect(() => {
    addMeta('referrer', 'referrer', 'no-referrer');
    return () => {
      deleteMeta('referrer');
    };
  }, []);

  return (
    <ProCard
      split="vertical"
      title="微信菜单管理"
      subTitle={<Link to={`/workbench/operation/wechat/menu/dashboard?appid=${appid}`}>点击查看微信菜单数据分析</Link>}
      headerBordered
      extra={
        <div className={styles.noFormItemStyle}>
          选择公众号：
          <Select
            selectFirst
            value={appid}
            onChange={setAppid}
            allowClear={false}
            name="appid"
            parmas={{
              'filter[type]': 1,
            }}
            rules={[{ required: true }]}
          />
        </div>
      }
    >
      <Config appid={appid} />
    </ProCard>
  );
};
