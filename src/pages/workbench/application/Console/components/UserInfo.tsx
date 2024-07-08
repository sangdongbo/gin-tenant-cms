import { useState, useEffect, useImperativeHandle } from 'react';
import { Avatar } from 'antd';
import { useModel } from '@umijs/max';
import { ProCard2 } from '@/components/BaseComponents';
import { StatisticCard } from '@ant-design/pro-components';

import { queryCountRule } from '../service';
import style from './style.less';

const { Divider } = StatisticCard;

export default ({ userInfoRef }: any) => {
  const {
    initialState: { currentUser = {} },
  }: any = useModel('@@initialState');
  const [data, setData] = useState({ sum: 0, processing: 0 });

  const reset = () => {
    queryCountRule().then(setData);
  };

  useImperativeHandle(userInfoRef, () => ({
    reset,
  }));

  useEffect(() => {
    reset();
  }, []);

  return (
    <ProCard2>
      <div className={style['user-info-avatar']}>
        <Avatar size={50} src={currentUser?.avatar} />
      </div>
      <div className={style['user-info-nickname']}>{currentUser?.nickname || ''}</div>
      <div className={style['user-info-tag']}>
        <div className={style['user-info-tag-same']}>{currentUser?.is_admin == 1 ? '超级管理员(root)' : '普通管理员'}</div>
      </div>
      <StatisticCard.Group direction="row" style={{
        paddingTop: 30
      }}>
        <StatisticCard
          statistic={{
            title: '自有项目',
            value: data.sum,
          }}
          bodyStyle={{ padding: 0, textAlign: 'center' }}
        />
        <Divider type="vertical" />
        <StatisticCard
          statistic={{
            title: '进行中项目',
            value: data.processing,
            suffix: <div style={{ color: '#000000' }}>/ {data.sum}</div>,
            valueStyle: { color: '#0bc7ff' }
          }}
          bodyStyle={{ padding: 0, textAlign: 'center' }}
        />
      </StatisticCard.Group>
    </ProCard2>
  );
};
