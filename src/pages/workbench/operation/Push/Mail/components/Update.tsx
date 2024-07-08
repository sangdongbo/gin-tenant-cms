import { useState } from 'react';
import { message } from 'antd';
import { ModalForm } from '@ant-design/pro-components';

import Form from './Form';

import { updateRule } from '../service';

export default ({ record, onSave }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <a onClick={() => setModalVisible(true)}>编辑</a>
      <ModalForm
        width={380}
        title="修改模版"
        modalProps={{
          destroyOnClose: true,
        }}
        open={modalVisible}
        onOpenChange={setModalVisible}
        initialValues={record}
        onFinish={async (formValues: any) => {
          const res = await updateRule(record.id, {
            ...formValues,
          });
          message.success('保存成功');

          setModalVisible(false);

          onSave?.(res);
        }}
      >
        <Form
          typeProps={{ disabled: true }}
          hidefile
        />
      </ModalForm>
    </div >
  );
};
