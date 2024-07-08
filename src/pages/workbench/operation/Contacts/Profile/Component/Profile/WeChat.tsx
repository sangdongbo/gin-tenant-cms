import { Avatar, Space, Typography } from 'antd';
import ProRow from '@/components/BaseComponents/ProRow';

export default () => {

  const list: any[] = [
    {
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      nickname: '测试'
    },
    {
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      nickname: '测试'
    },
    {
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      nickname: '测试'
    },
    {
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
      nickname: '测试'
    }
  ];

  return (
    <>
      <ProRow gutter={36}>
        <Typography.Text strong>微信信息</Typography.Text>
        {list.map((item) => (
          <ProRow.Col key={item.id} lg={24} xl={12}>
            <Space size={12}>
              <Avatar size="small" src={item.logo} />
              {item.nickname}
            </Space>
          </ProRow.Col>
        ))}
      </ProRow>
    </>
  )
};
