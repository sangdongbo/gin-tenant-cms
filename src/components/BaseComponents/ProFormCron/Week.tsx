import React from 'react';
import { Select, Space } from 'antd';
import Day from './Day';

export default ({ value, onChange }: any) => {
  return (
    <Space>
      <Select
        value={Number(value[5])}
        style={{
          width: 84,
        }}
        defaultValue={1}
        options={[
          { value: 1, label: '星期一' },
          { value: 2, label: '星期二' },
          { value: 3, label: '星期三' },
          { value: 4, label: '星期四' },
          { value: 5, label: '星期五' },
          { value: 6, label: '星期六' },
          { value: 7, label: '星期日' },
        ]}
        onChange={(event) => {
          onChange({
            week: event,
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
