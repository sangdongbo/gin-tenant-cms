import { useState } from "react";
import { ProCard } from '@/components/BaseComponents';

import Advertisement from "./Advertisement";
import PromotionPlan from "./PromotionPlan";

const Promotion = () => {
  const [key, setKey] = useState('promotionPlan');

  return (
    <div>
      <ProCard
        hiddenPaddingTop
        tabs={{ activeKey: key, onChange: setKey }}
      >
        <ProCard.TabPane key="promotionPlan" tab="推广计划">
          <PromotionPlan />
        </ProCard.TabPane>
        <ProCard.TabPane key="advertisement" tab="广告">
          <Advertisement />
        </ProCard.TabPane>
      </ProCard>
    </div>
  )
};

export default Promotion;
