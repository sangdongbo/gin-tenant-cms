import { useState } from 'react';
import ProCard from '@/components/BaseComponents/ProCard';
import ProRow from '@/components/BaseComponents/ProRow';
import Select from '@/pages/workbench/operation/WeChat/Authorizer/Components/Select';
import DataTrends from './components/DataTrends';
import KeyIndicators from './components/KeyIndicators';
import Channel from './components/Channel';

export default () => {
  const [appid, setAppid] = useState<string>('');

  return (
    <ProCard
      ghost
      title="用户分析"
      extra={
        <div style={{ paddingRight: 24 }}>
          选择公众号：
          <Select
            selectFirst
            value={appid}
            onChange={(value: string) => {
              setAppid(value);
            }}
            allowClear={false}
            name="appid"
            rules={[{ required: true }]}
          />
        </div>
      }
    >
      {appid ? (
        <ProRow>
          <ProRow.Col span={24}>
            <DataTrends appid={appid} />
          </ProRow.Col>
          <ProRow.Col span={24}>
            <KeyIndicators
              appid={appid}
            />
          </ProRow.Col>
          <ProRow.Col span={24}>
            <Channel
              appid={appid}
            />
          </ProRow.Col>
        </ProRow>
      ) : null}
    </ProCard>
  );
};
