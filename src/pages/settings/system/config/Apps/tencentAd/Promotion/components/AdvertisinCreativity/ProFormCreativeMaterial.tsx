import { PlusOutlined } from '@ant-design/icons';
import { ProFormUploadButton } from '@ant-design/pro-components';
import { Typography, Space } from 'antd';

const { Title, Text } = Typography;

const ProFormCreativeMaterial = () => {

  return (
    <div>
      <Title level={5}>创意素材（0/12）</Title>
      <Text type="secondary">添加素材，自动为你衍生更多尺寸的创意素材，添加素材与自动衍生素材可一起投放</Text>
      <div style={{ paddingTop: 10 }}>
        <Space>
          <ProFormUploadButton
            icon={<PlusOutlined />}
            name="image"
            action="upload.do"
            title="图片/视频"
            noStyle
            rules={[{ required: true }]}
          />
          <ProFormUploadButton
            icon={<PlusOutlined />}
            name="image_group"
            action="upload.do"
            title="组图"
            noStyle
            rules={[{ required: true }]}
          />
        </Space>
      </div>
    </div>
  )
};
export default ProFormCreativeMaterial;
