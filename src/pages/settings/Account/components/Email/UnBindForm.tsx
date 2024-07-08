import { message } from 'antd';
import { ModalForm } from '@ant-design/pro-components';
import { unbindMailRule } from '../../../service';
import BaseForm from './BaseForm';

interface PropsType {
  fetchUserInfo: any;
  email: string;
  onVisibleChange?: any;
  [key: string]: any;
}

export default ({ fetchUserInfo, email, onSuccess, ...props }: PropsType) => {
  return (
    <ModalForm
      {...props}
      onFinish={async (value) => {
        try {
          const result = await unbindMailRule({ code: value.code });
          if (result) {
            await fetchUserInfo();
            message.success('解除绑定成功');
            props?.onVisibleChange?.(false);
          }
        } catch (error) {
          return false;
        }
        return true;
      }}
    >
      <BaseForm action="unbind" email={email} />
    </ModalForm>
  );
};
