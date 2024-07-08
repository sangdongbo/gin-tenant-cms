import React from 'react';
import ProCard from '@/components/BaseComponents/ProCard';

import './index.less';

export default ({ url, ...props }: any) => {
  return (
    <ProCard
      title="预览"
      headerBordered
      bodyStyle={{
        width: "100%",
        maxWidth: 1250,
        height: window.innerHeight - 160,
        margin: '0 auto',
      }}
      {...props}
    >
      <iframe
        src={url}
        frameBorder="0"
        style={{ width: '100%', height: '100%' }}
      />
    </ProCard>
  );
};
