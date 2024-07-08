import { useEffect, useState, useImperativeHandle } from 'react';
import { AutoComplete } from 'antd';
import { ProForm } from '@ant-design/pro-components';

const BaseAutoComplete = ({ actionRef, ...props }: any) => {
  const onChange = (value: any) => {
    props?.onChange?.(value);
  };

  useImperativeHandle(actionRef, () => ({
    onChange,
  }));

  return (
    <AutoComplete
      filterOption={(inputValue, option: any) => {
        return option?.label?.toLowerCase().includes(inputValue?.toLowerCase()) || false;
      }}
      {...props}
    />
  )
}

const ProFormAutoComplete = ({ actionRef, request, params, options: parentOptions, fieldProps, ...props }: any) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(parentOptions || []);

  useEffect(() => {
    if (params) {
      request?.(params).then((result: any) => {
        setOptions(result);
      });
    }
  }, [params]);

  return (
    <>
      <ProForm.Item {...props}>
        <BaseAutoComplete
          options={options}
          actionRef={actionRef}
          {...fieldProps}
        />
      </ProForm.Item>
    </>
  );
};

export default ProFormAutoComplete;
