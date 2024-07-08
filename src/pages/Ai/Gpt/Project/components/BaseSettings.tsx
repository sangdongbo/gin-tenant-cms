import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSwitch,
  ProFormSelect,
} from '@ant-design/pro-components';
import TreeSelectTag from '@/pages/workbench/operation/Tag/Components/TreeSelectTag';

export default ({ showPerviewTag }: any) => {
  return (
    <>
      <ProFormText
        width="xl"
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
        width="xl"
        name="description"
        label="项目简述"
        placeholder="请输入项目简述"
        fieldProps={{
          showCount: true,
          maxLength: 255,
        }}
      />
      {/* <ProFormSwitch
        name="state"
        label="项目状态"
        initialValue={1}
        getValueFromEvent={(event) => event ? 1 : 0}
        fieldProps={{
          checkedChildren: '开启',
          unCheckedChildren: '关闭',
        }}
      /> */}
    </>
  );
};
