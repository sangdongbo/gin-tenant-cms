import { useState } from 'react';
import { Button } from 'antd';
import { ModalForm } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import FormContent from './FormContent';

import { addRule } from '../service';

export default ({ onFinish }: any) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <Button icon={<PlusOutlined />} key="field" type="primary" onClick={() => setVisible(true)}>
        新建
      </Button>
      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        width={600}
        title="新建分组"
        open={visible}
        onOpenChange={setVisible}
        onFinish={async (formValues: any) => {
          const res = await addRule(formValues);
          onFinish?.(res);
          return true;
        }}
      >
        <FormContent />
      </ModalForm>
    </div>
  );
};
