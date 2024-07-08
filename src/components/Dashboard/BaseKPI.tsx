import { StatisticCard } from '@ant-design/pro-components';
import { Typography, Divider } from 'antd';
import { ProCard } from '../BaseComponents';

const BaseKPI = ({ list, ...props }: any) => {
  return (
    <ProCard {...props}>
      {list.map((item: any, index: number) => {
        const { title, value, list = [] } = item;
        return (
          <ProCard key={index} style={{ height: '100%' }} bodyStyle={{ display: 'flex' }}>
            {index > 0 ? <Divider type="vertical" style={{ height: '100%' }} /> : null}
            <div
              style={{
                padding: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '100%' }}>
                <div>
                  <Typography.Text type="secondary">{title}</Typography.Text>
                </div>
                <div style={{ paddingBottom: 20 }}>
                  <Typography.Title level={2} style={{ marginBottom: 0, color: PRIMARYCOLOR }}>
                    {value}
                  </Typography.Title>
                </div>
                {
                  list?.length ? (
                    <StatisticCard.Group>
                      {list?.map((item: any, index: number) => (
                        <StatisticCard
                          key={index}
                          statistic={{
                            title: <Typography.Text type="secondary">{item.title}</Typography.Text>,
                            value: item.value,
                          }}
                        />
                      ))}
                    </StatisticCard.Group>
                  ) : null
                }
              </div>
            </div>
          </ProCard>
        )
      })}
    </ProCard>
  );
};

BaseKPI.isProCard = true;

export default BaseKPI;
