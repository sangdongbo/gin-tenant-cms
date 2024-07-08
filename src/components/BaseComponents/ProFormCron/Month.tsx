import React from 'react';
import { Select, Space } from 'antd';
import Day from './Day';

export default ({ value, onChange }: any) => {
  return (
    <Space>
      <Select
        style={{
          width: 126,
        }}
        value={Number(value[4]) || value[4]}
        options={[
          ...Array.from({ length: 31 }, (_, index) => ({ label: `${index + 1}号`, value: index + 1 })),
          {
            label: '每月最后一天',
            value: 'L',
          }
        ]}
        onChange={(event) => {
          onChange({
            month: event,
          });
        }}
      />
      <Day
        value={value}
        onChange={(event: any) => {
          onChange({
            day: event,
          });
        }}
      />
    </Space>
  );
};
