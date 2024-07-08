import { useEffect, useState } from 'react';
import { Statistic, Spin } from 'antd';
// import { ProCard } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';

import { queryStatisticRule } from '../../service';

export default () => {
  const [data, setData] = useState({ sum: 0, subscribe: 0, register: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queryStatisticRule().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);
  return (
    <Spin spinning={loading}>
      <ProCard.Group>
        <ProCard>
          <Statistic title="用户总数" value={data.sum} />
        </ProCard>
        <ProCard.Divider />
        <ProCard>
          <Statistic title="关注公众号用户数" value={data.subscribe} />
        </ProCard>
        <ProCard.Divider />
        <ProCard>
          <Statistic title="注册用户数" value={data.register} />
        </ProCard>
      </ProCard.Group>
    </Spin>
  );
};
