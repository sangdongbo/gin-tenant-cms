// import { useEffect, useState } from 'react';
// import classnames from 'classnames';

import { ProTable } from '@/components/BaseComponents';

export default (props: any) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ProTable
        {...props}
        search={false}
        cardProps={{
          bodyStyle: {
            padding: 0
          }
        }}
      />
    </div>
  );
};
