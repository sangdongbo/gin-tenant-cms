import { StatisticCard } from '@ant-design/pro-components';
import { BaseProCard } from '@/components/Dashboard';
import SimplifyNumbers from '@/components/SimplifyNumbers';
import { Typography } from 'antd';

export default ({ loading, title, total, list = [] }: any) => {
  return (
    <BaseProCard
      loading={loading}
      title={title}
      bodyStyle={{
        padding: '9px 20px'
      }}
    >
      <StatisticCard.Group>
        <StatisticCard
          layout="center"
          style={{
            height: '100%',
          }}
          bodyStyle={{
            paddingInline: 0
          }}
        >
          <Typography.Title level={2} style={{ margin: 0, width: '100%', textAlign: 'center' }}>
            <SimplifyNumbers value={total} />
          </Typography.Title>
        </StatisticCard>
        <StatisticCard.Divider />
        <StatisticCard>
          {list.map((item: any, index: number) => {
            return (
              <StatisticCard.Statistic
                key={index}
                title={<span style={{ whiteSpace: 'nowrap' }}>{item.title}</span>}
                value={`${item.value}人`}
                trend={item.trend}
                valueStyle={{ whiteSpace: 'nowrap' }}
              />
            );
          })}
        </StatisticCard>
      </StatisticCard.Group>
    </BaseProCard>
  );
};
