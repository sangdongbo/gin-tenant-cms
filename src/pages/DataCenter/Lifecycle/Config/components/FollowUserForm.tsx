import ProFormGroup from '@/components/BaseComponents/ProFormGroup';
import { ProFormText } from '@ant-design/pro-components';

export default () => {
  return (
    <ProFormGroup
      title="关注用户"
      tooltip="指系统中，关注过所选公众号的粉丝数据，应用此数据必须先绑定公众号"
    >
      <ProFormText
        name={['data', 'level_2', 'title']}
        label="阶段名称"
        rules={[
          {
            required: true,
          },
        ]}
      />
      {/* <OfficialAccountSelect
        label="选择公众号"
        name={['data', 'level_2', 'value', 'appid']}
        width={328}
      /> */}
    </ProFormGroup>
  );
};
