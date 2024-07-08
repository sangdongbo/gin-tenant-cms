import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { addCustomRule } from '../service';

export default ({ children, tableAction }) => {
  return (
    <ModalForm
      title="新建人群"
      trigger={children}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await addCustomRule(values);
        message.success('提交成功');
        tableAction?.reload();
        return true;
      }}
      width={300}
    >
      <ProFormText
        rules={[{ required: true }]}
        name="custom_name"
        label="人群名称"
        placeholder="建议在30个字符内"
        fieldProps={{
          maxLength: 30,
          showCount: true,
        }}
      />
    </ModalForm>
  );
};
