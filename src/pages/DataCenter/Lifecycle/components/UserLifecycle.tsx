import { BaseProCard } from '@/components/Dashboard';
import { useModel } from '@umijs/max';
import ProRow from '@/components/BaseComponents/ProRow';

import Statistic from './Statistic';

export default ({ customClaimCycle, loading }: any) => {
  const { dataCustomization, lifeCycleOverview, declarationPeriodFieldMapping } = useModel(
    'declarationPeriod',
    (model) => model,
  );

  return (
    <ProRow>
      {declarationPeriodFieldMapping.map((item: any, index: number) => {
        const currentLifeCycleOverview: any =
          lifeCycleOverview?.filter((it: any) => it.type == item.type)[0] || {};

        const currentValue = {
          title: dataCustomization?.data[item.titleKey]?.title || item.title,
          total: currentLifeCycleOverview.total || 0,
          list: [
            {
              title: '昨日新增',
              value: currentLifeCycleOverview?.new_cnt_yesterday || 0,
              trend: 'up',
            },
            {
              title: '昨日减少',
              value: currentLifeCycleOverview?.dec_cnt_yesterday || 0,
              trend: 'down',
            },
          ],
        };

        return (
          <ProRow.Col span={12} key={index}>
            <Statistic
              loading={loading}
              title={currentValue.title}
              total={currentValue.total}
              list={currentValue.list}
            />
          </ProRow.Col>
        );
      })}
      <ProRow.Col span={12}>
        <BaseProCard
          loading={loading}
          // size="small"
          bodyStyle={{
            padding: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            {customClaimCycle()}
          </div>
        </BaseProCard>
      </ProRow.Col>
    </ProRow>
  );
};
