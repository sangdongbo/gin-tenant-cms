import ProRow from '@/components/BaseComponents/ProRow';
import { ChartsCard, ChartsLine } from '@/components/Dashboard';
import { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';
import Overview from './components/Overview';
import UserLifecycle from './components/UserLifecycle';
import Config from './Config';
import { getConfigRule, getLifeCycleOverviewRule, getLifeCycleTimelineRule } from './service';
import { LineChartOutlined } from '@ant-design/icons';

// 转换数据结构
const convertDataStructure = (obj: any) => {
  const list: any[] = [];
  const listKeys = Object.keys(obj);
  listKeys.forEach((item: any) => {
    list.push({
      ...obj[item],
      type: item,
    });
  });
  return list;
};

export default () => {
  const { declarationPeriodFieldMapping, updaterLifeCycleOverview } = useModel(
    'declarationPeriod',
    (model) => model,
  );

  const init = () => {
    Promise.all([
      getLifeCycleOverviewRule()
    ]).then((res) => {
      const LifeCycleOverviewRuleRes = res[0];
      updaterLifeCycleOverview(convertDataStructure(LifeCycleOverviewRuleRes));
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <ProRow>
        <ProRow.Col span={12}>
          <UserLifecycle customClaimCycle={() => <Config />} />
        </ProRow.Col>
        <ProRow.Col span={12}>
          <Overview />
        </ProRow.Col>
        <ProRow.Col span={24}>
          <ChartsCard
            row={3}
            titleIocn={<LineChartOutlined />}
            title="趋势分析"
            options={declarationPeriodFieldMapping.map(item => ({ value: item.type, label: item.title }))}
          >
            <ChartsLine
              xField="dt"
              yField="total"
              seriesField="title"
              handelData={(data: any[]) =>
                data.map((item: any) => ({
                  ...item,
                  title: 'UV',
                }))
              }
              request={getLifeCycleTimelineRule}
            />
          </ChartsCard>
        </ProRow.Col>
      </ProRow>

      {/* <DataScreening
        cardProps={{
          title: '流失用户',
          headerBordered: true,
          extra: <a>导出</a>,
        }}
        data={DataScreeningData}
      /> */}
    </>
  );
};
