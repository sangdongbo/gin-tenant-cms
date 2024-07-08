import { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { FileSearchOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';
import { BaseProCard } from '@/components/Dashboard';

import { getOverviewRule } from '../../service';

export default () => {
  const { params } = useModel('analyze', (model) => model);
  const [data, setData] = useState<any>({});

  const { loading, run } = useRequest((currentParams) => {
    if (currentParams.project_ids?.length) {
      return getOverviewRule(currentParams);
    };
    return new Promise<void>((resolve, reject) => resolve());
  }, {
    debounceWait: 1000,
    manual: true,
    onSuccess(res: any) {
      setData(res || {});
    }
  });

  useEffect(() => {
    run({
      ...params,
      project_ids: params?.project_ids.map((item: any) => item.value) || [],
    });
  }, [params]);

  return (
    <BaseProCard loading={loading} titleIocn={<FileSearchOutlined />} title="数据概览" row={1}>
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <StatisticCard.Group direction="row">
          <StatisticCard
            statistic={{
              title: '浏览总量-PV',
              value: data?.pageview_pv_cnt || 0,
              valueStyle: {
                color: '#0bc7ff',
                fontWeight: 'bold'
              },
            }}
            bodyStyle={{
              padding: '4px 24px'
            }}
          />
          <StatisticCard
            statistic={{
              title: '浏览人数-UV',
              value: data?.pageview_uv_cnt || 0,
              valueStyle: {
                color: '#0bc7ff',
                fontWeight: 'bold'
              },
            }}
            bodyStyle={{
              padding: '4px 24px'
            }}
          />
          <StatisticCard
            statistic={{
              title: '表单提交次数',
              value: data?.user_register_pv_cnt || 0,
              valueStyle: {
                color: '#0bc7ff',
                fontWeight: 'bold'
              },
            }}
            bodyStyle={{
              padding: '4px 24px'
            }}
          />
          <StatisticCard
            statistic={{
              title: '表单提交人数',
              value: data?.user_register_uv_cnt || 0,
              valueStyle: {
                color: '#0bc7ff',
                fontWeight: 'bold'
              },
            }}
            bodyStyle={{
              padding: '4px 24px'
            }}
          />
          <StatisticCard
            statistic={{
              title: '分享人数',
              value: data?.share_uv_cnt || 0,
              valueStyle: {
                color: '#0bc7ff',
                fontWeight: 'bold'
              },
            }}
            bodyStyle={{
              padding: '4px 24px'
            }}
          />
        </StatisticCard.Group>
      </div>
    </BaseProCard>
  );
};
