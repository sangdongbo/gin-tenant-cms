import { ModalForm } from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';
import BaseSettings from './BaseSettings';

interface PropsType extends ModalFormProps {

}

export default (props: PropsType) => {
  return (
    <ModalForm
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      width={500}
      {...props}
    >
      <BaseSettings />
    </ModalForm>
  );
};
