import { ModalForm } from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';
import Forms from './Forms';

interface PropsType extends ModalFormProps {

}

export default (props: PropsType) => {
  return (
    <ModalForm
      modalProps={{
        destroyOnClose: true,
      }}
      layout="horizontal"
      labelCol={{
        span: 3
      }}
      width={600}
      {...props}
    >
      <Forms />
    </ModalForm>
  )
}
