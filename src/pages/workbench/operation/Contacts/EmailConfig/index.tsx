import { Typography } from 'antd'
import { ProForm, ProFormText } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';

import { createServiceRule, getServiceRule } from '@/pages/settings/system/config/Mail/service';

import RichText from './RichText';

export default () => {
  const type = 'mail_code';

  return (
    <ProCard title="发送验证码模版设置">
      <ProForm
        request={async () => {
          return getServiceRule(type);
        }}
        onFinish={async (values: any) => {
          await createServiceRule({
            ...values,
            type,
          });
          return true;
        }}
      >
        <ProFormText width="lg" label="发送人名称" name={['data', 'from_name']} />
        <ProFormText width="lg" label="邮件标题" name={['data', 'subject']} />
        <div style={{ paddingBottom: 24 }}>
          变量说明<Typography.Text type="secondary">
            <div dangerouslySetInnerHTML={{
              __html: '{code}替换邮箱验证码'
            }} />
          </Typography.Text>
        </div>
        <ProForm.Item label="邮件正文" name={['data', 'html']} style={{ marginBottom: 0 }}>
          <RichText />
        </ProForm.Item>
      </ProForm>
    </ProCard>
  );
};
