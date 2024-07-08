import { ModalForm } from "@ant-design/pro-components"
import type { ModalFormProps } from "@ant-design/pro-components";
import { Forms } from '../Details/BaseForm';


export default (props: ModalFormProps) => {
  return (
    <ModalForm
      modalProps={{
        destroyOnClose: true,
      }}
      width={600}
      title="新建活动"
      {...props}
    >
      <Forms />
    </ModalForm>
  )
}
