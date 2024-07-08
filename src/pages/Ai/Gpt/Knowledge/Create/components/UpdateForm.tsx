import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
// import ToastEditor from './ToastEditor';
import { ProFormToastEditor } from '@/components/BaseComponents';

export default ({ ...props }: any) => {
  return (
    <ModalForm
      trigger={props?.children}
      modalProps={{
        destroyOnClose: true,
      }}
      omitNil={false}
      {...props}
    >
      <ProFormText
        name="title"
        label="标题"
        placeholder="请输入名称"
        rules={[{ required: true }]}
      />
      <ProFormToastEditor name="content" label="内容" rules={[{ required: true }]} />
    </ModalForm>
  );
};
