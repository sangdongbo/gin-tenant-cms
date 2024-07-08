import React, { useEffect } from 'react';
import { useModel } from 'umi';
import './index.less';

export default ({ onStart }: any) => {

  return (
    <div className="open-screen">
      <div>
        <div className="open-screen-robot" />
        <div className="open-screen-play" onClick={() => onStart?.()}>开始</div>
      </div>
    </div>
  )
}
