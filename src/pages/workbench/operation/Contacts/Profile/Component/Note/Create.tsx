import { ModalForm, ProFormTextArea } from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';

interface PropsType extends ModalFormProps {

}

export default (props: PropsType) => {
  return (
    <ModalForm
      modalProps={{
        destroyOnClose: true,
      }}
      width={440}
      {...props}
    >
      <ProFormTextArea
        name="note"
        fieldProps={{
          rows: 5,
          showCount: true,
          maxLength: 255,
        }}
        rules={[
          { required: true },
          {
            whitespace: true,
          },
        ]}
      />
    </ModalForm>
  )
}
