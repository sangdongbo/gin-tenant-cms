import React from 'react';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-components';

import Editor from './Editor';

interface FormProps { }

const Form: React.FC<FormProps> = ({ }) => {
  return (
    <>
      <ProFormText
        label="名称"
        name="name"
        fieldProps={{ showCount: true, maxLength: 100 }}
        rules={[{ required: true }, { whitespace: true, message: '请输入名称' }]}
      />
      <Editor name={['data', 'text']} />
      <ProFormTextArea
        label="备注"
        name="remark"
        fieldProps={{ showCount: true, maxLength: 255 }}
      />
    </>
  );
};

export default Form;
