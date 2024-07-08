import { useState } from 'react';

import { ModalForm } from '@ant-design/pro-components';
import Form from './Form';

export default ({ initialValue, onFinish }: any) => {
  const [visible, setVisible] = useState(false);

  const onAddFinish = async (values: any) => {
    await onFinish?.(values)
    setVisible(false);
  };

  return (
    <>
      <a
        onClick={() => setVisible(true)}
      >
        编辑
      </a>
      <ModalForm
        initialValues={initialValue}
        omitNil={false}
        modalProps={{
          destroyOnClose: true,
        }}
        title="修改隐私条款"
        open={visible}
        onOpenChange={setVisible}
        width={500}
        onFinish={onAddFinish}
      >
        <Form />
      </ModalForm>
    </>
  )
};
