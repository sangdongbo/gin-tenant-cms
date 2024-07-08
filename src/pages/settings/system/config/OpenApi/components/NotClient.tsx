import { useState } from 'react';
import { Space, Button, Typography, Modal } from 'antd';
import ClientSecret from './ClientSecret';

import { addRule } from '../service';

export default ({ onCancel }: any) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [client, setClient] = useState<any>();

  const onClose = () => {
    onCancel?.();
    setVisible(false);
  };

  return (
    <>
      <Space align="center" direction="vertical" style={{ width: '100%' }}>
        <Typography.Text>暂未开启开放平台</Typography.Text>
        <Button
          type="primary"
          loading={loading}
          onClick={async () => {
            setLoading(true);
            try {
              const res = await addRule();
              setClient(res);
              setVisible(true);
            } catch (error) { }
            setLoading(false);
          }}
        >
          点击开启
        </Button>
      </Space>
      <Modal
        title="重置Client Secret"
        open={visible}
        footer={
          <Button type="primary" onClick={() => onClose()}>
            我已保存，确认关闭
          </Button>
        }
        onCancel={() => onClose()}
        destroyOnClose
        width={600}
      >
        <ClientSecret value={client?.secret} />
      </Modal>
    </>
  );
};
