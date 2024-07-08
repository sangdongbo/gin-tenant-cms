import React, { useState } from 'react';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import Form from './Form';

export default ({ onFinish }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button icon={<PlusOutlined />} onClick={() => setVisible(true)}>新建</Button>
      <ModalForm
        omitNil={false}
        modalProps={{
          destroyOnClose: true,
        }}
        title="新建隐私条款"
        open={visible}
        onOpenChange={setVisible}
        width={500}
        onFinish={async (values: any) => {
          onFinish?.(values);
          setVisible(false);
        }}
      >
        <Form />
      </ModalForm>
    </>
  )
};
