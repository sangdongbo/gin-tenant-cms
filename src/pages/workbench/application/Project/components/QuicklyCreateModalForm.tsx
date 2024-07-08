import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';
import { queryGetFolderSelectRule } from '../service';

export default ({ width = 400, title = '创建项目', ...props }: ModalFormProps) => {
  return (
    <ModalForm {...props} width={width} title={title}>
      <ProFormText
        name="title"
        label="项目名称"
        fieldProps={{ maxLength: 16 }}
        extra="项目名称最多输入16个中文或英文"
        rules={[{ required: true }, { whitespace: true, message: '请输入项目名称' }]}
      />
      <ProFormSelect
        name="folder_id"
        label="文件夹"
        request={queryGetFolderSelectRule}
      />
    </ModalForm>
  );
};
