import { Button, Avatar, Typography, Space } from 'antd';

import BaseProCard from '@/components/Dashboard/BaseProCard';

export default ({ logo, title, briefIntroduction, showSetting = false, onSetting, onAccess, ...props }: any) => {
  const ButtonDom = () => {
    if (showSetting) {
      return (
        <Button type="primary" onClick={onSetting}>
          进入设置
        </Button>
      );
    } else {
      return (
        <Button
          type="primary"
          onClick={onAccess}
        >
          立即接入
        </Button>
      );
    }
  };

  return (
    <BaseProCard row={2} {...props} size="default">
      <Space direction="vertical" align="center" size={9} style={{ width: '100%' }}>
        <Avatar shape="square" size={80} src={logo} />
        <Typography.Title
          level={3}
        >
          {title}
        </Typography.Title>
        <div style={{ height: 66 }}>
          <Typography.Paragraph
            type="secondary"
            ellipsis={{
              rows: 3
            }}
          >
            {briefIntroduction}
          </Typography.Paragraph>
        </div>
        <ButtonDom />
      </Space>
    </BaseProCard>
  )
};
