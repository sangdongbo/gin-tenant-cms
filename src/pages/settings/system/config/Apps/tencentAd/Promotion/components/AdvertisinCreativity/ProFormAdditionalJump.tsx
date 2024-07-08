import { PlusOutlined } from '@ant-design/icons';
import { ProFormText, ProFormList } from '@ant-design/pro-components';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const ProFormAdditionalJump = () => {

  return (
    <div>
      <Title level={5}>附加跳转能力</Title>
      <div style={{ paddingBottom: 10 }}>
        <Text type="secondary">提供更多广告创意跳转能力，优化广告创意跳转链路</Text>
      </div>
      <ProFormText
        width="xl"
        name="additional_jump"
        label="应用直达URL(选填)"
        placeholder="请输入应用直达链接，指定点击广告可直达的应用内落地页"
        rules={[{ required: true }]}
      />
    </div>
  )
};
export default ProFormAdditionalJump;
