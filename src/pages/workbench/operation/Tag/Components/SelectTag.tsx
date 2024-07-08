import React from 'react';
import { ProFormSelect } from '@ant-design/pro-components';
import { querySelectRule } from '../service';

export default ({ name = 'tags', width = 'sm', rules = [{ required: true }], ...props }: any) => {
  return (
    <>
      <ProFormSelect
        width={width}
        mode="multiple"
        name={name}
        label="标签"
        rules={rules}
        request={async (params) => await querySelectRule(params)}
        {...props}
      />
    </>
  );
};
