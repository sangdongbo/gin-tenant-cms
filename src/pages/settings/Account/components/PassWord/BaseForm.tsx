import { ProForm, ProFormText } from '@ant-design/pro-components';

import { LockOutlined } from '@ant-design/icons';
import { Level } from '../PasswordLevel';
import checkPasswordLevel from '@/utils/checkPasswordLevel';

export default () => {
  return (
    <>
      <ProFormText.Password
        name="old_password"
        label="原始密码"
        rules={[
          { required: true },
          {
            pattern: /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/,
            message: '密码格式错误！',
          },
        ]}
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        hasFeedback
      />
      <ProFormText.Password
        name="password"
        label="新密码"
        extra={
          <>
            <div>新密码长度8~16位，数字、字母、字符至少包含两种</div>

            <ProForm.Item noStyle shouldUpdate>
              {({ getFieldValue, getFieldError }) => {
                if (!getFieldValue('password') || getFieldError('password').length > 0)
                  return <></>;
                return (
                  <>
                    密码强度：
                    <Level grade={checkPasswordLevel(getFieldValue('password'))} />
                  </>
                );
              }}
            </ProForm.Item>
          </>
        }
        rules={[
          { required: true },
          {
            pattern: /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/,
            message: '密码格式错误！',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue('old_password') === value) {
                return Promise.reject(new Error('新旧密码不能一致!'));
              }
              return Promise.resolve();
            },
          }),
        ]}
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        hasFeedback
      />
      <ProFormText.Password
        name="confirm_password"
        label="再次输入新密码"
        dependencies={['password']}
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('您输入的两个密码不匹配!'));
            },
          }),
        ]}
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        hasFeedback
      />
    </>
  );
};
