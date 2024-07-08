// import { Statistic } from '@ant-design/pro-components';
import { Spin, Typography } from 'antd';
import BaseProCard from './BaseProCard';
import BaseStatisticCard from './BaseStatisticCard';
import ProRow from '../BaseComponents/ProRow';

export default ({ title, list, loading = false, rowProps, cardProps }: any) => {
  return (
    <Spin spinning={loading}>
      <BaseProCard {...cardProps} size="small" title={title} bodyStyle={{ paddingTop: 8 }}>
        <ProRow>
          {list.map((item: any, index: number) => {
            return (
              <ProRow.Col
                showLine={index != list.length - 1}
                span={12}
                {...(item?.ColProps || {})}
                {...rowProps}
                onClick={() => {
                  rowProps?.onClick?.(item, index);
                }}
                key={index}
              >
                <BaseStatisticCard title={item.title}>
                  <div>
                    <Typography.Title level={2} style={{ marginBottom: 0 }}>
                      {item.value}
                    </Typography.Title>
                    {/* {item.descriptionTitle ? (
                      <Statistic
                        title={item.descriptionTitle}
                        value={item.descriptionValue}
                        trend={item.descriptionTrend}
                      />
                    ) : null} */}
                    {item?.statistic}
                  </div>
                </BaseStatisticCard>
              </ProRow.Col>
            );
          })}
        </ProRow>
      </BaseProCard>
    </Spin>
  );
};
