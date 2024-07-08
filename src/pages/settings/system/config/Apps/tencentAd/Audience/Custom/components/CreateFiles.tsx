import {
  DrawerForm,
  ProFormRadio,
  ProFormUploadDragger,
  ProFormDependency,
  ProFormSelect,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { addCustomFileRule } from '../service';
import { querySelectRule } from '@/pages/workbench/operation/WeChat/Authorizer/service';

export default ({ children, audienceId, tableAction }: any) => {
  return (
    <DrawerForm
      title="上传人群"
      trigger={children}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        values.audience_id = audienceId;
        await addCustomFileRule(values);
        message.success('提交成功');
        tableAction?.reload();
        return true;
      }}
      width={600}
    >
      <ProFormRadio.Group
        name="operation_type"
        label="文件操作类型"
        radioType="button"
        initialValue="APPEND"
        options={[
          {
            label: '追加操作',
            value: 'APPEND',
          },
          {
            label: '缩减操作',
            value: 'REDUCE',
          },
        ]}
        rules={[{ required: true }]}
      />
      <ProFormRadio.Group
        name="user_id_type"
        label="号码包用户ID类型"
        radioType="button"
        initialValue="HASH_MOBILE_PHONE"
        options={[
          {
            label: '手机号 - MD5',
            value: 'HASH_MOBILE_PHONE',
          },
          {
            label: '微信OpenID',
            value: 'WECHAT_OPENID',
          },
        ]}
        rules={[{ required: true }]}
      />
      <ProFormDependency name={['user_id_type']}>
        {({ user_id_type }) => {
          if (user_id_type == 'WECHAT_OPENID') {
            return (
              <ProFormSelect
                params={{ 'filter[type]': 1 }}
                request={querySelectRule}
                name="open_app_id"
                label="微信 AppID"
                rules={[{ required: true }]}
              />
            );
          }
        }}
      </ProFormDependency>
      <ProFormDependency name={['user_id_type']}>
        {({ user_id_type }) => {
          const options: any[] = [
            {
              label: '上传',
              value: 'upload',
            },
          ];
          if (user_id_type == 'WECHAT_OPENID') {
            options.push({
              label: '微信粉丝',
              value: 'wechat_openid',
            });
          } else if (user_id_type == 'HASH_MOBILE_PHONE') {
            options.push({
              label: '联系人',
              value: 'contact',
            });
          }
          return (
            <ProFormRadio.Group
              name="source_type"
              label="数据来源"
              radioType="button"
              initialValue="upload"
              options={options}
              rules={[{ required: true }]}
            />
          );
        }}
      </ProFormDependency>

      <ProFormDependency name={['source_type']}>
        {({ source_type }) => {
          if (source_type == 'upload') {
            return (
              <ProFormUploadDragger
                name="file"
                label="拖拽上传"
                max={1}
                rules={[{ required: true, message: '请拖拽上传' }]}
                accept=".txt,.csv"
                fieldProps={{
                  beforeUpload: () => {
                    return false;
                  }
                }}
              />
            );
          }
        }}
      </ProFormDependency>
    </DrawerForm>
  );
};
