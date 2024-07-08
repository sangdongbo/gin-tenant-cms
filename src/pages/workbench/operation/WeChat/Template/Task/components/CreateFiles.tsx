import {
  ModalForm,
  ProFormDependency,
  ProFormRadio,
  ProFormUploadDragger,
  ProFormSelect,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { addCustomFileRule } from '../service';
import { querySelectRule } from '@/pages/workbench/operation/Group/service';

export default ({ children, params, tableAction }: any) => {
  return (
    <ModalForm
      title="上传人群"
      trigger={children}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        const { id, currentParams } = params;
        await addCustomFileRule(id, {
          ...values,
          ...currentParams,
        });
        message.success('上传成功');
        tableAction?.reload();
        return true;
      }}
      width={600}
    >
      <ProFormRadio.Group
        name="type"
        label="文件操作类型"
        radioType="button"
        initialValue="append"
        options={[
          {
            label: '追加操作',
            value: 'append',
          },
          {
            label: '覆盖操作',
            value: 'cover',
          },
        ]}
        rules={[{ required: true }]}
      />
      <ProFormRadio.Group
        name="source_type"
        label="数据来源"
        radioType="button"
        initialValue="upload"
        options={[
          {
            label: '上传',
            value: 'upload',
          },
          {
            label: '分组',
            value: 'group',
          },
          {
            label: '关注粉丝',
            value: 'custom',
          },
        ]}
        rules={[{ required: true }]}
      />
      <ProFormDependency name={['source_type']}>
        {({ source_type }) => {
          if (source_type == 'upload') {
            return (
              <ProFormUploadDragger
                name="file"
                // label="拖拽上传"
                label={<>
                  拖拽上传
                  <a style={{ fontSize: 12 }} target="_blank" href='//lookstar.oss-cn-beijing.aliyuncs.com/tenant/static/office/template/openid-template.csv'>（下载示例）</a>
                </>}
                max={1}
                rules={[{ required: true }]}
                accept=".txt,.csv"
                fieldProps={{
                  beforeUpload: () => {
                    return false;
                  },
                }}
              />
            );
          }
          if (source_type == 'group') {
            return (
              <ProFormSelect
                name="group_id"
                label="分组"
                tooltip="当目标人群选择为动态分组时，此任务动态分组的用户人群为截止到设置当前任务时的动态分组人群"
                request={querySelectRule}
                rules={[{ required: true }]}
              />
            );
          }
          return null;
        }}
      </ProFormDependency>
    </ModalForm>
  );
};
