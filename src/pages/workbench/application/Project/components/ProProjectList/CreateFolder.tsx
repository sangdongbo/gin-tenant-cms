import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';

interface PropsType extends ModalFormProps {

}

export default ({ width = 400, ...props }: PropsType) => {
  return (
    <ModalForm
      modalProps={{
        destroyOnClose: true,
      }}
      {...props}
      width={width}
    >
      <ProFormText
        name="title"
        label="文件夹名称"
        fieldProps={{ maxLength: 16 }}
        extra="文件夹名称最多输入16个中文或英文"
        rules={[{ required: true }, { whitespace: true, message: '请输入文件夹名称' }]}
      />
    </ModalForm>
  );
};
