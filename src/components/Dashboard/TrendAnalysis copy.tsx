// import { ProCard } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';
import { Radio } from 'antd';
// import moment from 'moment';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import BaseProCard from './BaseProCard';
import LineCharts from './LineCharts';
export default ({
  columns = [],
  size = 'default',
  timeOptions = [],
  tabsProps = {},
  ...props
}: any) => {
  const [timeSlot, setTimeSlot] = useState<any>(timeOptions.length ? timeOptions[0].value : '');

  return (
    <BaseProCard
      bodyStyle={{
        padding: '0',
      }}
    >
      <ProCard
        size={size}
        {...props}
        style={{
          height: '100%',
        }}
        extra={
          timeOptions.length ? (
            <Radio.Group size={size} value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
              {timeOptions.map((item: any) => (
                <Radio.Button key={item.value} value={item.value}>
                  {item.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          ) : null
        }
        bodyStyle={{
          padding: 0,
        }}
        tabs={{
          size: size,
          tabPosition: 'left',
          ...tabsProps,
        }}
      >
        {columns.map(
          (
            { request, title, params = {}, chartsProps, tabKey, tabParmasKey, key, ...item }: any,
            index: number,
          ) => {
            const columnsParmas: any = {};
            columnsParmas[tabParmasKey ? tabParmasKey : 'filter[tab]'] = tabKey;

            if (timeOptions.length) {
              // columnsParmas[key ? key : 'filter[time]'] = timeSlot;
              columnsParmas.star_time = dayjs().subtract(timeSlot, 'day').format('YYYYMMDD');
              columnsParmas.end_time = dayjs().format('YYYYMMDD');
            }

            return (
              <React.Fragment key={index}>
                <ProCard.TabPane tab={title} {...item} key={tabKey}>
                  <LineCharts
                    {...chartsProps}
                    request={request}
                    params={{
                      ...columnsParmas,
                      ...params,
                    }}
                  />
                </ProCard.TabPane>
              </React.Fragment>
            );
          },
        )}
      </ProCard>
    </BaseProCard>
  );
};
