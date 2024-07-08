import { message } from 'antd';
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { MobileOutlined, LockOutlined } from '@ant-design/icons';
import { Crypto } from '@bluedot-tech/bluedot-antd';
import { getCaptchaRule, getUnbindSmsRule } from '../../../service';

export default ({ action, phone }: any) => {
  const props = {
    disabled: phone ? true : false,
    initialValue: phone,
  };

  const rules: any[] = [
    {
      required: true,
      message: '请输入手机号',
    },
  ];

  if (!props.disabled) {
    rules.push({
      pattern: /^1\d{10}$/,
      message: '手机号格式错误！',
    });
  }

  return (
    <>
      <ProFormText
        fieldProps={{
          size: 'large',
          prefix: <MobileOutlined className={'prefixIcon'} />,
        }}
        width={302}
        {...props}
        name="phone"
        placeholder={'请输入手机号'}
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
        phoneName="phone"
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
          const params = { phone: crypt.aes_encrypt(value), action: action, crypt_key };
          if (phone) {
            await getUnbindSmsRule(params);
          } else {
            await getCaptchaRule(params);
          }
          message.success('获取验证码成功！');
        }}
      />
    </>
  );
};
