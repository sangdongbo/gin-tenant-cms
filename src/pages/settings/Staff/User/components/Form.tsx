import { ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

import { selectRoleRule } from '../../service';

const getSuffix = (value: string) => {
  return `@${value.split('@')[1]}`;
};

export default () => {
  const { initialState } = useModel('@@initialState');

  return (
    <>
      <ProFormText
        name="username"
        label="账号"
        rules={[
          { required: true },
          {
            pattern: /^([a-zA-Z\d.\-_]+)$/,
            message: '账号格式错误！',
          },
        ]}
        addonAfter={getSuffix(initialState?.currentUser?.username)}
        extra="账号格式仅能包含字母、数字、-、_或."
        fieldProps={{
          autoComplete: 'off',
        }}
      />
      <ProFormText.Password
        name="password"
        label="密码"
        extra="密码长度8~16位，数字、字母、字符至少包含两种"
        rules={[
          { required: true },
          {
            pattern: /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/,
            message: '密码格式错误！',
          },
        ]}
        fieldProps={{
          autoComplete: 'off',
        }}
        hasFeedback
      />
      <ProFormText.Password
        name="confirm_password"
        label="确认密码"
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
        hasFeedback
      />

      {/* <ProFormText
          name="email"
          label="邮箱"
          rules={[
            {
              pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: '邮箱格式错误！',
            },
          ]}
        />
        <ProFormText
          name="phone"
          label="手机"
          rules={[
            {
              pattern: /^1\d{10}$/,
              message: '手机格式错误！',
            },
          ]}
        /> */}

      <ProFormSelect
        name="roles"
        label="部门"
        request={selectRoleRule}
        // fieldProps={{ mode: 'multiple' }}
      />
    </>
  );
};
