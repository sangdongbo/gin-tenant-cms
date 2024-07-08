import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useRef, useState } from 'react';

import ProFormTemplate from './ProFormTemplate';

export default ({
  modalProps,
  submitter,
  // hideTemplateSelect,
  // initialValues,
  onFinish,
  ...props
}: any) => {
  const [templateData, setTemplateData] = useState();
  const formRef = useRef();

  return (
    <ModalForm
      formRef={formRef}
      modalProps={{
        destroyOnClose: true,
        ...modalProps,
      }}
      submitter={{
        ...submitter,
        // 透传 templateData
        render: (props, dom) => {
          return submitter.render(props, dom, { templateData });
        },
      }}
      layout="horizontal"
      width={860}
      {...props}
      onFinish={(values) => {
        return onFinish(values, { templateData });
      }}
    >
      <ProFormText width="md" label="消息名称" name="title" rules={[{ required: true }]} />

      <ProFormTemplate
        label="模板消息"
        name="data"
        onSelectTemplate={setTemplateData}
        rules={[
          {
            required: true,
            message: '请选择模版',
          },
        ]}
      />
    </ModalForm>
  );
};
