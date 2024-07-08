import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import type { ModalFormProps } from '@ant-design/pro-components';
interface PropsType extends ModalFormProps {

};

export const projectType = [
  {
    label: 'Landing Page',
    value: 'landing',
  },
  {
    label: '微刊',
    value: 'microbook',
  },
  {
    label: '资料下载',
    value: 'data_download',
  },
  {
    label: '活动中心',
    value: 'event',
  },
];

export default ({ width = 400, title = '创建项目', ...props }: PropsType) => {
  return (
    <ModalForm {...props} width={width} title={title}>
      <ProFormText
        name="title"
        label="项目名称"
        fieldProps={{ maxLength: 16 }}
        extra="项目名称最多输入16个中文或英文"
        rules={[{ required: true }, { whitespace: true, message: '请输入项目名称' }]}
      />
      <ProFormRadio.Group
        name="type"
        label="项目类型"
        options={projectType}
        rules={[{ required: true }]}
        initialValue="landing"
      />
    </ModalForm>
  );
};
