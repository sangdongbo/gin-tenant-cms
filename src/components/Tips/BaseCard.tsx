import { Button, Typography, Space } from 'antd';
import { history } from '@umijs/max';
import ProCard from '@/components/BaseComponents/ProCard';
const { Title } = Typography;

const WechatAuthorizer = ({ text, link, btnText }: any) => {

  return (
    <ProCard bodyStyle={{ display: 'flex', alignItems: "center", height: 300 }}>
      <Space align="center" direction="vertical" style={{ width: '100%', }}>
        <Title level={4} style={{ textAlign: 'center' }}>{text}</Title>
        <Button type="primary" onClick={() => history.push(link)}>{btnText}</Button>
      </Space>
    </ProCard>
  )
};

export default WechatAuthorizer;
