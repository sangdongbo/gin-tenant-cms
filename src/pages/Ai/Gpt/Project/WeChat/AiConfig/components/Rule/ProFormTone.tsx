import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Select, Space, Input } from 'antd';
import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';

interface PropsType extends ProFormItemProps {
  fieldProps?: any;
  options?: any[];
};

const CustomTone = ({ allowClear, options: baseOptions, value: baseValue, onChange: baseOnChange }: any) => {
  const [value, setValue] = useState(baseValue);
  const [options] = useState([
    ...baseOptions,
    {
      label: '其他',
      value: '其他',
    }
  ]);

  const onChange = (event: any) => {
    baseOnChange(event);
  };

  useEffect(() => {
    setValue(baseValue);
  }, [baseValue]);

  return (
    <Space>
      <Select
        allowClear={allowClear}
        value={value}
        style={{ width: 328 }}
        onChange={onChange}
        options={options}
      />
      {
        value == '其他' ? (
          <Input
            style={{ width: 328 }}
          />
        ) : null
      }
    </Space>
  );
};

const ProFormTone = ({ fieldProps, options, allowClear, ...props }: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <CustomTone allowClear={allowClear} options={options} {...fieldProps} />
    </ProForm.Item>
  );
};

export default ProFormTone;
