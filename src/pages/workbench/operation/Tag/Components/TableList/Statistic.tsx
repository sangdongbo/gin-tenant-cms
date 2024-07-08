import { useEffect, useState } from 'react';
import { Statistic, Spin } from 'antd';
// import { ProCard } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';
import { queryStatisticRule } from '../../service';

export default () => {
  const [data, setData] = useState({
    tag_category_count: 0,
    tag_count: 0,
    tag_hit_count: 0,
    tag_user_count: 0,
    tag_cover: 0,
  });
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
          <Statistic title="标签总数量" value={data.tag_count} />
        </ProCard>
        <ProCard.Divider />
        <ProCard>
          <Statistic title="标签沾染总数(UV)" value={data.tag_hit_count} />
        </ProCard>
        <ProCard.Divider />
        <ProCard>
          <Statistic title="带标签用户数(UV)" value={data.tag_user_count} />
        </ProCard>
        <ProCard.Divider />
        <ProCard>
          <Statistic title="带标签人数比例" value={data.tag_cover} suffix="%" />
        </ProCard>
      </ProCard.Group>
    </Spin>
  );
};
