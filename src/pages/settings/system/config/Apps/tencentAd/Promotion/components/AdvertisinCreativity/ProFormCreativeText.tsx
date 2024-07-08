import { PlusOutlined } from '@ant-design/icons';
import { ProFormText, ProFormList } from '@ant-design/pro-components';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const ProFormCreativeText = () => {

  return (
    <div>
      <Title level={5}>创意文案（1/10）</Title>
      <ProFormList
        label="文案"
        name="creative_text"
        initialValue={[{}]}
        creatorButtonProps={{
          creatorButtonText: '新建',
        }}
      >
        <ProFormText
          name="text"
          width="md"
          placeholder="请输入广告文案"
          rules={[{ required: true }]}
        />
      </ProFormList>
    </div>
  )
};
export default ProFormCreativeText;
