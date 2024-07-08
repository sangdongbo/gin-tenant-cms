import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { useModel } from '@umijs/max';

import { createServiceRule } from '../service';
export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const mailCofing = initialState?.mailCofing || {};

  return (
    <ProForm
      submitter={{
        resetButtonProps: {
          style: {
            display: 'none',
          },
        },
      }}
      onFinish={async (value) => {
        value.type = 'mail';
        const res = await createServiceRule(value);
        message.success('配置成功');
        setInitialState({
          ...initialState,
          mailCofing: res,
        });
      }}
      initialValues={mailCofing}
    // request={() => getMailRule('mail')}
    >
      <ProFormText
        name={['data', 'host']}
        label="SMTP服务器"
        rules={[{ required: true }]}
        width="md"
      />
      <ProFormText
        name={['data', 'port']}
        label="SMTP端口"
        rules={[{ required: true }]}
        width="md"
      />
      <ProForm.Group>
        <ProFormText
          name={['data', 'username']}
          label="SMTP用户名"
          rules={[{ required: true }]}
          width="md"
        />
        <ProFormText
          name={['data', 'username_from']}
          label="发送别名"
          rules={[{ required: true }]}
          width="md"
        />
      </ProForm.Group>
      <ProFormText.Password
        name={['data', 'password']}
        label="SMTP密码"
        rules={[{ required: true }]}
        width="md"
      />
      <ProFormSelect
        name={['data', 'verify_type']}
        label="SMTP验证方式"
        request={async () => [
          { label: 'SSL', value: 'ssl' },
          { label: 'TLS', value: 'tls' },
        ]}
        rules={[{ required: true }]}
        initialValue="ssl"
        width="md"
      />
    </ProForm>
  );
};
