import ProFormGroup from '@/components/BaseComponents/ProFormGroup';
import { ProFormText } from '@ant-design/pro-components';

export default () => {
  return (
    <ProFormGroup title="注册用户" tooltip="指在系统中，通过任一表单填写联系人字段中的手机号的用户">
      <ProFormText
        name={['data', 'level_4', 'title']}
        label="阶段名称"
        rules={[
          {
            required: true,
          },
          {
            whitespace: true,
          },
        ]}
      />
    </ProFormGroup>
  );
};
