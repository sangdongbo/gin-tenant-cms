import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';

export default (props: any) => {
  return (
    <ModalForm
      width="400px"
      trigger={props?.children}
      modalProps={{
        destroyOnClose: true,
      }}
      omitNil={false}
      {...props}
    >
      <ProFormText
        name="title"
        label="标题"
        placeholder="请输入名称"
        rules={[{ required: true }]}
      />
      <ProFormRadio.Group
        name="type"
        label="内容类型"
        initialValue="md"
        options={[
          {
            label: 'Markdown',
            value: 'md',
          },
        ]}
        rules={[{ required: true }]}
      />
    </ModalForm>
  );
};
