import React from 'react';
import { ProFormTextArea } from '@ant-design/pro-components';

interface RemarkProps { }

const Remark: React.FC<RemarkProps> = () => {
  return (
    <>
      <ProFormTextArea label="备注" name="remark" placeholder="最多200汉字" />
    </>
  );
};

export default Remark;
