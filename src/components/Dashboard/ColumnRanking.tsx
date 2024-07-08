// import { ProCard } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';
import { Col, Radio, Row } from 'antd';
import React, { useState } from 'react';
import ColumnCharts from './ColumnCharts';
import Rank from './Rank';

export default ({ columns, timeOptions = [], ...props }: any) => {
  const [timeSlot, setTimeSlot] = useState<any>(timeOptions.length ? timeOptions[0].value : '');

  return (
    <ProCard
      headerBordered
      tabs={{
        size: props.size || 'default',
        tabPosition: 'left',
      }}
      {...props}
      extra={
        timeOptions.length ? (
          <Radio.Group
            size={props.size || 'default'}
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            {timeOptions.map((item: any) => (
              <Radio.Button key={item.value} value={item.value}>
                {item.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        ) : null
      }
    >
      {columns.map(
        (
          {
            columnChartsRequest,
            rankRequest,
            title,
            tabKey,
            key,
            tabParmasKey,
            chartsParams = {},
            rankParams = {},
            ...item
          }: any,
          index: number,
        ) => {
          const columnsParmas = {};
          columnsParmas[tabParmasKey ? tabParmasKey : 'filter[tab]'] = tabKey;
          if (timeOptions.length) {
            columnsParmas[key ? key : 'filter[time]'] = timeSlot;
          }

          return (
            <React.Fragment key={index}>
              <ProCard.TabPane tab={title} {...item} key={tabKey}>
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <ColumnCharts
                      params={{
                        ...columnsParmas,
                        ...chartsParams,
                      }}
                      request={columnChartsRequest}
                    />
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Rank
                      params={{
                        ...columnsParmas,
                        ...rankParams,
                      }}
                      request={rankRequest}
                    />
                  </Col>
                </Row>
              </ProCard.TabPane>
            </React.Fragment>
          );
        },
      )}
    </ProCard>
  );
};
