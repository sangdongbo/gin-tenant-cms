// import { Funnel, FUNNEL_CONVERSATION_FIELD } from '@ant-design/charts';
import { BaseProCard } from '@/components/Dashboard';
import { Bar } from '@ant-design/charts';
import { useModel } from '@umijs/max';
import { BarChartOutlined } from '@ant-design/icons';

export default (props: any) => {
  const { dataCustomization, lifeCycleOverview, declarationPeriodFieldMapping } = useModel(
    'declarationPeriod',
    (model) => model,
  );

  const handelFunnelData = () => {
    const currentData = declarationPeriodFieldMapping.map((item: any) => {
      const currentLifeCycleOverview: any =
        lifeCycleOverview?.filter((it: any) => it.type == item.type)[0] || {};
      return {
        title: dataCustomization?.data[item.titleKey]?.title || item.title,
        total: currentLifeCycleOverview.total || 0,
      };
    });
    return currentData;
  };

  const config = {
    data: handelFunnelData(),
    xField: 'total',
    yField: 'title',
    seriesField: 'title',
    legend: {
      position: 'bottom',
    },
    ...props,
  };

  return (
    <BaseProCard titleIocn={<BarChartOutlined />} title="数据概览" row={3}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Bar {...config} />
      </div>
    </BaseProCard>
  );
};
