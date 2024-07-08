import { useState, useEffect } from 'react';
import ProCardTabPane from '@/components/BaseComponents/ProCardTabPane';
// import { ProCard } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';
import { addMeta, deleteMeta } from '@/utils/meta';
// import Automatic from './Automatic';
import Table from './Table';

export default () => {
  const [key, setKey] = useState('keyword');

  useEffect(() => {
    addMeta('referrer', 'referrer', 'no-referrer');
    return () => {
      deleteMeta('referrer');
    };
  }, []);

  return (
    <>
      <ProCard
        tabs={{
          activeKey: key,
          onChange: setKey,
          cardProps: {
            bodyStyle: {
              padding: 0,
            },
          },
        }}
      >
        <ProCardTabPane key="keyword" tab="关键词回复">
          <Table type="keyword" />
        </ProCardTabPane>
        <ProCardTabPane key="msg" tab="收到消息默认回复">
          <Table type="msg" />
        </ProCardTabPane>
        <ProCardTabPane key="subscribe" tab="被关注默认回复">
          <Table type="subscribe" />
        </ProCardTabPane>
      </ProCard>
    </>
  );
};
