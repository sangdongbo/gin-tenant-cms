import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

export default ({ value, format = 'HH:mm', onChange }: any) => {
  return (
    <TimePicker
      value={dayjs(`${value[2] == '*' ? 8 : value[2]}:${value[1] == '*' ? 0 : value[1]}`, 'HH:mm')}
      style={{
        width: 84,
      }}
      allowClear={false}
      format={format}
      onChange={onChange}
    />
  );
};
