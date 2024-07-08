import React, { useState, useEffect } from 'react';

import { ProCard, ProRow } from '@/components/BaseComponents';
import Info from './Info';
import Authorizer from './Authorizer';
import Star from '../Star';

// import { updateStarRule } from '../../../service';

const Account: React.FC<any> = ({ profile, id, onStar, }) => {

  return (
    <ProCard
      bordered={false}
      style={{ marginBottom: 24 }}
      title="个人信息"
      extra={<Star
        star={profile?.star}
        onClick={async () => {
          await onStar?.()
        }}
      />}
    >
      <ProRow>
        <ProRow.Col span={24}>
          <Info profile={profile} />
        </ProRow.Col>
        <ProRow.Col span={24}>
          {/* <WeChat /> */}
          <Authorizer id={id} />
        </ProRow.Col>
      </ProRow>
    </ProCard>
  );
};
export default Account;
