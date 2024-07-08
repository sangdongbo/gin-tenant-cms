import { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import Form from './Form';
import { addRule } from '../service';

export default ({ id, onSubmit, defaultVisible }: any) => {
  const [visible, setVisible] = useState(defaultVisible);

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setVisible(true);
        }}
      >
        新建
      </Button>
      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        width={300}
        title="新建任务"
        open={visible}
        onOpenChange={setVisible}
        onFinish={async (formValue) => {
          const res = await addRule({
            template_id: id,
            ...formValue
          });
          onSubmit?.(res);
          return true;
        }}
      >
        <Form />
      </ModalForm>
    </div>
  );
};
