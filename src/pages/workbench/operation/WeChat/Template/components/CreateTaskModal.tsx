import { ModalForm } from '@ant-design/pro-components';
import Form from '@/pages/workbench/operation/WeChat/Task/components/Form';
import { addRule } from '@/pages/workbench/operation/WeChat/Task/service';

export default ({ id, onPreRequest, onSubmit, modalProps, ...props }: any) => {

  return (
    <ModalForm
      modalProps={{
        destroyOnClose: true,
        ...modalProps,
      }}
      width={500}
      title="新建任务"
      onFinish={async (formValue) => {
        const preRes = await onPreRequest?.(formValue);
        const res = await addRule({
          template_id: preRes.id,
          ...formValue
        });
        await onSubmit?.(res);
        return true;
      }}
      {...props}
    >
      <Form />
    </ModalForm>
  );
};
