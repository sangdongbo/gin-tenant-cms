import React, { useState, useEffect } from 'react';
import { Descriptions } from 'antd';
import { getRule } from '../../../service';

export default ({ profile }: any) => {

  return (
    <Descriptions column={1} size="small">
      <Descriptions.Item label="积分">{profile?.lookstar_score || 0}</Descriptions.Item>
      <Descriptions.Item label="姓名">{profile?.full_name || '-'}</Descriptions.Item>
      <Descriptions.Item label="公司">{profile?.company || '-'}</Descriptions.Item>
      <Descriptions.Item label="职位">{profile?.job || '-'}</Descriptions.Item>
      <Descriptions.Item label="手机号">{profile?.mask_data?.phone || '-'}</Descriptions.Item>
      <Descriptions.Item label="邮箱">{profile?.mask_data?.email || '-'}</Descriptions.Item>
      <Descriptions.Item label="地址">
        {profile?.province || ''}
        {profile?.city || ''}
        {profile?.district || ''}
        {profile?.full_address || ''}
      </Descriptions.Item>
      <Descriptions.Item label="来源">{profile?.channel || '未知'}</Descriptions.Item>
    </Descriptions>
  );
};
