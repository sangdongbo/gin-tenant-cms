import React from "react";
import { Typography, Space } from 'antd';
import TargetDetails from './TargetDetails';
import Position from "./Position";
import Directional from './Directional';
import ScheduledBid from "./ScheduledBid";
import Basics from "./Basics";

const { Title } = Typography;

export const campaignTypeOptions = [
  {
    label: '展示广告计划',
    value: 'CAMPAIGN_TYPE_NORMAL',
  },
  {
    label: '搜索广告计划',
    value: 'CAMPAIGN_TYPE_SEARCH',
  },
];

const Advertisement = ({ title }: any) => {

  return (
    <div style={{ paddingBottom: 12 }}>
      {
        title ? (
          <Title level={5}>
            {title}
          </Title>
        ) : null
      }
      <Space size={[12, 12]} direction="vertical" style={{ width: '100%' }}>
        <TargetDetails />
        <Position />
        <Directional />
        <ScheduledBid />
        <Basics />
      </Space>
    </div>
  );
};

export default Advertisement;
