import { useState } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import Form from './Form';

import { addRule } from '../service';

export default ({ onSave }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <Button key="field" icon={<PlusOutlined />} type="primary" onClick={() => setModalVisible(true)}>
        新建
      </Button>
      <ModalForm
        width={500}
        title="新建模板"
        modalProps={{
          destroyOnClose: true,
        }}
        open={modalVisible}
        onOpenChange={setModalVisible}
        onFinish={async (formValues: any) => {
          const res = await addRule({
            ...formValues,
          });
          message.success('保存成功');
          setModalVisible(false);
          onSave?.(res);
          return true;
        }}
      >
        <Form />
      </ModalForm>
    </div>
  );
};
