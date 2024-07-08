import { StatisticCard } from '@ant-design/pro-components';
import { Typography } from 'antd';

const BaseStatisticCard = ({ title, children, ...props }: any) => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        {title ? <Typography.Text type="secondary">{title}</Typography.Text> : null}
      </div>
      <StatisticCard layout="center" bodyStyle={{ padding: 0, textAlign: 'center' }} {...props}>
        {children}
      </StatisticCard>
    </>
  );
};

export default BaseStatisticCard;
