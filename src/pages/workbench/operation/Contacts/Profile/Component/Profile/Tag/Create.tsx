import { ModalForm, ProForm } from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';
import TreeSelectTag from '@/pages/workbench/operation/Tag/Components/TreeSelectTag';

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
      <ProForm.Item name="tag_ids" label="标签" rules={[{ required: true }]} initialValue={[]}>
        <TreeSelectTag width="100%" rules={[]} />
      </ProForm.Item>
    </ModalForm>
  )
}
