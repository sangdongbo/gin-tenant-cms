import { useState } from 'react';
import { Button, message } from 'antd';
import {
  ModalForm,
} from '@ant-design/pro-components';
import { ProFormMailFile } from './Form';

import { addUploadHtmlRule } from '../service';

export default ({ record, onSave }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <a onClick={() => setModalVisible(true)}>编辑内容</a>
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
          const res = await addUploadHtmlRule(record.id, {
            ...formValues,
          });
          message.success('保存成功');

          setModalVisible(false);

          onSave?.(res);
          return true;
        }}
      >
        <ProFormMailFile
          label="选择文件"
          name="file"
          rules={[
            {
              required: true,
              message: '请上传文件',
            }
          ]}
        />
      </ModalForm>
    </div >
  );
};
