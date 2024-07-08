import { useRef } from 'react';
// import { ModalForm } from '@ant-design/pro-components';
// import type { ModalFormProps } from '@ant-design/pro-components';
import { ModalForm, DrawerForm } from '@ant-design/pro-components';
import type { ModalFormProps, DrawerFormProps } from '@ant-design/pro-components';
import Forms from './Forms';


interface Props extends DrawerFormProps {
  fieldProps?: {
    showDownload: boolean;
  },
}

export default ({ drawerProps, fieldProps, ...props }: Props) => {
  const formRef = useRef<any>()
  return (
    <DrawerForm
      formRef={formRef}
      width="90%"
      {...props}
      // drawerProps={}
      drawerProps={{
        destroyOnClose: true,
        maskClosable: false,
        ...drawerProps,
      }}
    >
      <Forms
        {...fieldProps}
      />
    </DrawerForm>
  )
}
