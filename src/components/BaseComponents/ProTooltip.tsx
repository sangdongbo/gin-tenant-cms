import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

export default ({ children, tooltip, ...props }: any) => {
  return (
    <Tooltip
      placement="right"
      color="#fff"
      title={<div style={{ color: '#000' }}>{tooltip}</div>}
      {...props}
    >
      {children ? children : <InfoCircleOutlined />}
    </Tooltip>
  );
};
