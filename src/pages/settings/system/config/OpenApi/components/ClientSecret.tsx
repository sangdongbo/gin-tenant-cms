import { Space, Typography } from 'antd';
import { ProFormText } from '@ant-design/pro-components';

export default ({ value }: any) => {
  return (
    <ProFormText
      fieldProps={{
        value,
      }}
      disabled
      name="secret"
      label="Client Secret"
      width={400}
      addonAfter={
        <Space align="center" direction="vertical">
          <Typography.Paragraph style={{ margin: 0 }} copyable={{ text: value }} />
        </Space>
      }
      extra={
        <Typography.Text type="danger">
          Client Secret已生成本页面关闭后开放平台不在存储和显示Client Secret，请妥善保存。
        </Typography.Text>
      }
    />
  );
};
