import { message } from 'antd';
import {
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { getCaptchaRule, getUnbindMailRule } from '../../../service';
import { Crypto } from '@bluedot-tech/bluedot-antd';

export default ({ action, email }: any) => {
  const props = {
    disabled: email ? true : false,
    initialValue: email,
  };
  const rules: any = [
    {
      required: true,
      message: '请输入邮箱',
    },
  ];
  if (!props.disabled) {
    rules.push({
      pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
      message: '邮箱格式错误！',
    });
  }

  return (
    <>
      <ProFormText
        fieldProps={{
          size: 'large',
          prefix: <MailOutlined className={'prefixIcon'} />,
        }}
        width={302}
        {...props}
        name="email"
        placeholder={'请输入邮箱'}
        rules={rules}
      />
      <ProFormCaptcha
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        width={302}
        captchaProps={{
          size: 'large',
        }}
        phoneName="email"
        placeholder={'请输入验证码'}
        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${count} ${'获取验证码'}`;
          }
          return '获取验证码';
        }}
        name="code"
        rules={[
          {
            required: true,
            message: '请输入验证码！',
          },
        ]}
        onGetCaptcha={async (value) => {
          const crypt = new Crypto();
          const crypt_key = crypt.rsa_key_encrypt();
          const params = { email: crypt.aes_encrypt(value), action: action, crypt_key };
          if (email) {
            await getUnbindMailRule(params);
          } else {
            await getCaptchaRule(params);
          }
          message.success('获取验证码成功！');
        }}
      />
    </>
  );
};
