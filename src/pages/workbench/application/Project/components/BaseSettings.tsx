import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSwitch,
  ProFormSelect,
  ProFormDigit,
} from '@ant-design/pro-components';
import TreeSelectTag from '@/pages/workbench/operation/Tag/Components/TreeSelectTag';
import { queryGetFolderSelectRule } from '../service';
import { Col, Row } from 'antd';

export default ({ showPerviewTag }: any) => {
  return (
    <>
      <ProFormText
        name="title"
        width="lg"
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
        width="lg"
        name="description"
        label="项目简述"
        placeholder="请输入项目简述"
        fieldProps={{
          showCount: true,
          maxLength: 255,
          style: { height: '100px' },
        }}
      />
      {showPerviewTag ? (
        <>
          <ProForm.Item name="tag_ids" label="页面浏览标签" rules={[]} initialValue={[]}>
            <TreeSelectTag style={{ maxWidth: '440px' }} rules={[]} />
          </ProForm.Item>
          <ProFormDigit
            width="lg"
            label="页面浏览积分"
            name="lookstar_score"
            fieldProps={{ precision: 0 }}
          />
        </>
      ) : null}
      <ProFormSelect
        width="lg"
        name="folder_id"
        label="文件夹"
        getValueFromEvent={(event) => (event ? event : '')}
        request={queryGetFolderSelectRule}
      />
      <ProFormSwitch
        width="lg"
        name="state"
        label="项目状态"
        initialValue={0}
        getValueFromEvent={(event) => (event ? 1 : 0)}
        fieldProps={{
          checkedChildren: '开启',
          unCheckedChildren: '关闭',
        }}
      />
    </>
  );
};
