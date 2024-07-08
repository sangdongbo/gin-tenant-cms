import { useState } from 'react';
import { Empty } from 'antd';
import { useSearchParams } from '@umijs/max';
import ProCard from '@/components/BaseComponents/ProCard';
import ProRow from '@/components/BaseComponents/ProRow';
import Select from '@/pages/workbench/operation/WeChat/Authorizer/Components/Select';
import MenuDetails from './MenuDetails';
import KeyIndicators from './KeyIndicators';

import styles from '../style.less';

export default (props: any) => {
  const [searchParams] = useSearchParams();

  const [appid, setAppid] = useState<string>(searchParams.get('appid') || '');

  return (
    <ProCard
      ghost
      title="微信菜单数据分析"
      extra={
        <div className={styles.noFormItemStyle} style={{ paddingRight: 24 }}>
          {appid ? (
            <>
              选择公众号：
              <Select
                value={appid}
                onChange={(value: string) => {
                  setAppid(value);
                }}
                parmas={{
                  'filter[type]': 1,
                }}
                allowClear={false}
                name="appid"
                rules={[{ required: true }]}
              />
            </>
          ) : null}
        </div>
      }
    >
      {appid ? (
        <ProRow>
          <ProRow.Col span={24}>
            <KeyIndicators appid={appid} />
          </ProRow.Col>
          <ProRow.Col span={24}>
            <MenuDetails appid={appid} />
          </ProRow.Col>
        </ProRow>
      ) : (
        <ProCard
          ghost
          bodyStyle={{
            minHeight: 500,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="请您先选择公众号" />
        </ProCard>
      )}
    </ProCard>
  );
};
