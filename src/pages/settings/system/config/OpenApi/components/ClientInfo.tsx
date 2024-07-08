import { Space, Typography } from 'antd';
import ProTooltip from '@/components/BaseComponents/ProTooltip';
import ClientSecretFrom from './ClientSecretFrom';
import { ProDescriptions } from '@ant-design/pro-components';
import { useState } from 'react';

export default ({ clientId, dataSource }: any) => {
  const [visible, setVisible] = useState(false);
  const columns: any[] = [
    {
      title: 'Tenant ID',
      render: () => {
        const tenant = localStorage.getItem('lookstar-tenant-X-Tenant') || '';
        return (
          <Typography.Paragraph style={{ margin: 0 }} copyable={{ text: tenant }}>
            {tenant}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: 'Client ID',
      key: 'id',
      dataIndex: 'id',
      render: (dom: string) => (
        <Typography.Paragraph style={{ margin: 0 }} copyable={{ text: dom }}>
          {dom}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Client Secret',
      render: () => {
        return (
          <Space size={4} align="center">
            <a onClick={() => setVisible(true)}>重置</a>
            <ProTooltip
              style={{ margin: 0 }}
              tooltip="（为保障帐号安全，开放平台不再储存Client Secret；如果遗忘，请重置）"
            />
          </Space>
        );
      },
    },
    {
      title: '文档地址',
      render: () => (
        <a
          target="_blank"
          href="https://developers.lookstar.com.cn"
          rel="noreferrer"
        >
          https://developers.lookstar.com.cn
        </a>
      ),
    },
  ];

  return (
    <>
      <ProDescriptions column={1} dataSource={dataSource} columns={columns} />

      <ClientSecretFrom clientId={clientId} visible={visible} onCancel={() => setVisible(false)} />
    </>
  );
};
