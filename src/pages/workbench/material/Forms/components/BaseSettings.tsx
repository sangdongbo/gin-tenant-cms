import { ProForm, ProFormText, ProFormTextArea, ProFormSwitch } from '@ant-design/pro-components';
import TreeSelectTag from '@/pages/workbench/operation/Tag/Components/TreeSelectTag';

export default ({ showPerviewTag }: any) => {
  return (
    <>
      <ProFormText
        name="title"
        label="项目名称"
        placeholder="请输入项目名称"
        fieldProps={{
          maxLength: 16,
        }}
        extra="项目名称最多输入16个中文或英文"
        rules={[
          { required: true },
          {
            whitespace: true,
          },
        ]}
      />
      <ProFormTextArea
        name="description"
        label="项目简述"
        placeholder="请输入项目简述"
        fieldProps={{
          showCount: true,
          maxLength: 255,
        }}
      />
    </>
  );
};
