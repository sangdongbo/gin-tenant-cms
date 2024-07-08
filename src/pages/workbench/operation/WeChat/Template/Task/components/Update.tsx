import { ModalForm } from '@ant-design/pro-components';
import Form from './Form';
import { updateRule } from '../service';

export default ({ id, onSubmit, ...props }: any) => {

  return (
    <div>
      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        width={300}
        title="修改任务"
        trigger={
          <a key="field" type="primary">
            编辑
          </a>
        }
        onFinish={async (formValue) => {
          const res = await updateRule(id, formValue);
          onSubmit?.(res);
          return true;
        }}
        {...props}
      >
        <Form />
      </ModalForm>
    </div>
  );
};
