import { message } from 'antd';
import { useModel, history } from '@umijs/max';
import { stringify } from 'querystring';
import { ModalForm } from '@ant-design/pro-components';
import { passwordResetRule } from '../../../service';
import BaseForm from './BaseForm';
import { Crypto } from '@bluedot-tech/bluedot-antd';
import { outLogin } from '@/services/ant-design-pro/api';

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin();
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

export default ({ fetchUserInfo, ...props }: any) => {
  const { setInitialState } = useModel('@@initialState');

  return (
    <ModalForm
      {...props}
      onFinish={async (value) => {
        const crypt = new Crypto();
        const crypt_key = crypt.rsa_key_encrypt();
        value.old_password = crypt.aes_encrypt(value.old_password);
        value.password = crypt.aes_encrypt(value.password);
        value.confirm_password = crypt.aes_encrypt(value.confirm_password);
        await passwordResetRule({ ...value, crypt_key });
        message.success('修改成功', 3, () => {
          loginOut();
          setInitialState((s) => ({ ...s, currentUser: undefined }));
          // props?.onVisibleChange(false);
        });
        return true;
      }}
    >
      <BaseForm />
    </ModalForm>
  );
};
