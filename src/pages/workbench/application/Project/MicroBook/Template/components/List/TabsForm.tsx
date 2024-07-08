import { ProFormText } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProFormText
        name="name"
        label="分类"
        rules={[
          { required: true },
          { whitespace: true, message: '请输入分类名称' },
        ]}
        // extra="最多输入6个字"
        fieldProps={{ maxLength: 6, showCount: true }}
      />
    </>
  );
};
