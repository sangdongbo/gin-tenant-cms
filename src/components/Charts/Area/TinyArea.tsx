import React from 'react';

import { TinyArea as AntdTinyArea } from '@ant-design/charts';

const TinyArea: React.FC<any> = ({ data }) => {
  return (
    <div>
      <AntdTinyArea
        height={40}
        autoFit={false}
        data={data}
        smooth={true}
        areaStyle={{ fill: '#d6e3fd' }}
      />
    </div>
  );
};
export default TinyArea;
