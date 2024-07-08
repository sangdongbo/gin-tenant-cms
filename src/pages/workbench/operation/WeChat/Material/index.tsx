import React, { useState, useRef, useEffect } from 'react';
import { addMeta, deleteMeta } from '@/utils/meta';
import { ProCard } from '@/components/BaseComponents';
import { News, Link, Text, Image, Video } from './Component';

const TableList: React.FC<{}> = () => {
  const [tab, handleTab] = useState('news');

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
          tabPosition: 'top',
          activeKey: tab,
          onChange: (key) => handleTab(key),
          cardProps: {
            bodyStyle: {
              padding: 0,
            },
          },
        }}
      >
        <ProCard.TabPane key="news" tab="图文">
          <News />
        </ProCard.TabPane>
        <ProCard.TabPane key="text" tab="文本">
          <Text />
        </ProCard.TabPane>
        <ProCard.TabPane key="link" tab="外链">
          <Link />
        </ProCard.TabPane>
        <ProCard.TabPane key="image" tab="图片">
          <Image />
        </ProCard.TabPane>
        <ProCard.TabPane key="video" tab="视频">
          <Video />
        </ProCard.TabPane>
      </ProCard>
    </>
  );
};
export default TableList;
