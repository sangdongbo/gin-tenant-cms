import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Select, message, Space } from 'antd';
import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';
import Day from './Day';
import Week from './Week';
import Month from './Month';

interface PropsType extends ProFormItemProps {
  fieldProps?: any;
};

const defaultValue = {
  day: '0 0 8 * * ?',// 每天8:00
  week: '0 0 8 * * 1',// 每周一 8:00
  month: '0 0 8 * L ?',// 每月最后一天 8:00
};

/**
 * 示例：* * * * * ?
 * 主要：'*' 不指定    '？'只能在日和星期（周）中指定使用，其作用为不指定
 * 第一位：秒 0 - 59
 * 第二位：分 0 - 59
 * 第三位：时 0 - 23
 * 第四位：日 1 - 31  L 表示每月最后一日
 * 第五位：月 1 - 12
 * 第六位：周 1 - 7   7 == 周日
*/
const CustomCron = ({ value, onChange }: any) => {
  const [cycle, setCycle] = useState<'month' | 'week' | 'day'>('day');
  const valueArray = value?.split(' ') || [];

  useEffect(() => {
    if (value) {
      if (
        (valueArray[3] == '*' || valueArray[3] == '?') &&
        (valueArray[4] == '*' || valueArray[4] == '?') &&
        (valueArray[5] == '*' || valueArray[5] == '?')
      ) {
        setCycle('day');
      } else if (valueArray[5] != '*' && valueArray[5] != '?') {
        setCycle('week');
      } else if (valueArray[4] != '*' && valueArray[4] != '?') {
        setCycle('month');
      } else {
        message.error("Cron格式错误！");
      };
    } else {
      // 设置默认值
      onChange(defaultValue[cycle]);
    };
  }, [value]);

  return (
    <Space>
      <Select
        value={cycle}
        options={[
          { value: 'day', label: '每天' },
          { value: 'week', label: '每周' },
          { value: 'month', label: '每月' },
        ]}
        onChange={(val) => {
          onChange(defaultValue[val]);
        }}
      />
      {
        cycle == 'day' ? (
          <Day
            value={valueArray}
            onChange={(event: any) => {
              const hour = dayjs(event).hour();
              const minute = dayjs(event).minute();
              onChange(`0 ${minute} ${hour} * * ?`);
            }}
          />
        ) : null
      }
      {
        cycle == 'week' ? (
          <Week
            value={valueArray}
            onChange={(event: any) => {
              let currentValue = value;
              const { day, week } = event;
              if (week) {
                currentValue = `0 ${valueArray[1]} ${valueArray[2]} * * ${week}`;
              };
              if (day) {
                const hour = dayjs(day).hour();
                const minute = dayjs(day).minute();
                currentValue = `0 ${minute} ${hour} * * ${valueArray[5]}`;
              };
              onChange(currentValue);
            }}
          />
        ) : null
      }
      {
        cycle == 'month' ? (
          <Month
            value={valueArray}
            onChange={(event: any) => {
              let currentValue = value;
              const { day, month } = event;
              if (month) {
                currentValue = `0 ${valueArray[1]} ${valueArray[2]} * ${month} ?`;
              };
              if (day) {
                const hour = dayjs(day).hour();
                const minute = dayjs(day).minute();
                currentValue = `0 ${minute} ${hour} * ${valueArray[4]} ?`;
              };
              onChange(currentValue);
            }}
          />
        ) : null
      }
    </Space>
  );
}

const ProFormCron = ({ fieldProps, ...props }: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <CustomCron {...fieldProps} />
    </ProForm.Item>
  );
};

export default ProFormCron;
