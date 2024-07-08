import ProFormGroup from '@/components/BaseComponents/ProFormGroup';
import { ProFormText } from '@ant-design/pro-components';

export default () => {
  return (
    <ProFormGroup title="触达用户" tooltip="指通过任何途径，进入到系统全部用户总数">
      <ProFormText
        name={['data', 'level_1', 'title']}
        label="阶段名称"
        rules={[
          {
            required: true,
          },
        ]}
      />
    </ProFormGroup>
  );
};
