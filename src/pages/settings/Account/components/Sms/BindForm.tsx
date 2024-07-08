import { message } from 'antd';
import { ModalForm } from '@ant-design/pro-components';
import { bindSmsRule } from '../../../service';
import BaseForm from './BaseForm';
import { Crypto } from '@bluedot-tech/bluedot-antd';

export default ({ fetchUserInfo, ...props }: any) => {
  return (
    <ModalForm
      {...props}
      onFinish={async (value) => {
        const crypt = new Crypto();
        const crypt_key = crypt.rsa_key_encrypt();
        value.phone = crypt.aes_encrypt(value.phone);
        const result = await bindSmsRule({ ...value, crypt_key });
        if (result.errcode == 0) {
          message.success('绑定成功');
          await fetchUserInfo();
          props?.onVisibleChange?.(false);
        } else {
          message.error(result.errmsg);
        }
        return true;
      }}
    >
      <BaseForm action="bind" />
    </ModalForm>
  );
};
