import React from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-components';

// import { queryTypeSelectRule } from '../service';

export default ({ trigger, visible, onVisibleChange, onFinish, ...props }: any) => {
  return (
    <>
      <ModalForm
        {...props}
        trigger={trigger}
        onFinish={onFinish}
        open={visible}
        onOpenChange={onVisibleChange}
      >
        {/* <ProFormSelect
          request={queryTypeSelectRule}
          name="type_id"
          label="类型"
          rules={[{ required: true }]}
        /> */}
        <ProFormText name="name" label="名称" rules={[{ required: true }]} />
      </ModalForm>
    </>
  );
};

