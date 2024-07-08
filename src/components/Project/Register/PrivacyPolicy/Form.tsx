import React from 'react';

import { ProForm } from '@ant-design/pro-components';

import RichText from './RichText';

export default () => {
  return (
    <>
      <ProForm.Item name="content">
        <RichText />
      </ProForm.Item>
    </>
  )
};
