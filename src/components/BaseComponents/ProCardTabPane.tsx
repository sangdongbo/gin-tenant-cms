import { ConfigProvider } from 'antd';
import { ProCard, ProConfigProvider } from '@ant-design/pro-components';

export default ({ children, ...props }: any) => {
  return <>123123</>;
  return (
    <ConfigProvider
      theme={{
        token: {
          paddingLG: 0,
          padding: 0,
        }
      }}
    >
      <ProConfigProvider
        token={{
          paddingLG: 0,
          padding: 0,
        }}
      >
        <ProCard.TabPane {...props}>
          {children}
        </ProCard.TabPane>
      </ProConfigProvider>
    </ConfigProvider>
  );
};
