import { ProFormText, ProFormRadio } from '@ant-design/pro-components';

export const typeOptions = [
  {
    label: '动态分组',
    value: 1,
  },
  {
    label: '静态分组',
    value: 2,
  },
];

export default () => {
  return (
    <>
      <ProFormText
        label="分组名称"
        name="title"
        rules={[
          {
            required: true,
          },
          {
            whitespace: true,
            message: '分组名称不能为空',
          },
        ]}
      />
      <ProFormRadio.Group
        label="分组类型"
        name="type"
        options={typeOptions}
        formItemProps={{
          style: {
            marginBottom: 0,
          },
        }}
        rules={[
          {
            required: true,
            message: '请选择分组类型',
          },
        ]}
      />
    </>
  );
};
