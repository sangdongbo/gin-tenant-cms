import { StepsForm } from '@ant-design/pro-components';
import BaseForm from './BaseForm';
import { unbindSmsRule, bindSmsRule } from '../../../service';
import { message } from 'antd';
import { Crypto } from '@bluedot-tech/bluedot-antd';

export default ({ fetchUserInfo, phone, ...props }: any) => {
  return (
    <StepsForm
      {...props}
      onFinish={async (value) => {
        const crypt = new Crypto();
        const crypt_key = crypt.rsa_key_encrypt();
        value.phone = crypt.aes_encrypt(value.phone);
        const result = await bindSmsRule({
          ...value,
          action: 'bind',
          crypt_key,
        });
        if (result.errcode == 0) {
          message.success('绑定成功');
          fetchUserInfo();
          props?.onOpenChange?.(false);
          return true;
        };
      }}
    >
      <StepsForm.StepForm
        name="base"
        title="验证手机号"
        onFinish={async (value) => {
          try {
            const result = await unbindSmsRule({ code: value.code });
            if (result) {
              return true;
            };
          } catch (error) { }
        }}
      >
        <BaseForm action="unbind" phone={phone} />
      </StepsForm.StepForm>
      <StepsForm.StepForm name="time" title="绑定手机号">
        <BaseForm action="bind" />
      </StepsForm.StepForm>
    </StepsForm>
  );
};
