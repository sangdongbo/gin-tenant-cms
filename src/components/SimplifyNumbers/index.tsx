import React, { useRef, useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { isFinite } from 'lodash';

export default ({ value }: any) => {
  const elemRef = useRef(null);
  const [formattedValue, setFormattedValue] = useState(0);
  const NumberFormattedValue = Number(formattedValue);

  useEffect(() => {
    const elem: any = elemRef.current;
    if (elem) {
      const elemWidth = elem.offsetWidth;
      // 加 1 是避免极值问题
      const fontSize = parseFloat(window.getComputedStyle(elem).fontSize) + 1;
      const ctx: any = document.createElement('canvas').getContext('2d');
      ctx.font = fontSize + 'px sans-serif';
      const textWidth = ctx.measureText(value.toString()).width;
      let result = value;
      if (textWidth > elemWidth) {
        if (value <= 999) {
          result = value.toString();
        } else if (value <= 9999) {
          result = `${(value / 1000).toFixed(0)}K`;
        } else if (value <= 99999) {
          result = `${(value / 10000).toFixed(0)}W`;
        } else {
          console.error('数字太大，暂时按过万处理');
          result = `${(value / 10000).toFixed(0)}W`;
        }
      }
      setFormattedValue(result.toString());
    }
  }, [elemRef, value]);
  return (
    <div ref={elemRef} style={{ width: '100%', whiteSpace: 'nowrap' }}>
      {isFinite(NumberFormattedValue) ? (
        formattedValue
      ) : (
        <Tooltip title={value}>{formattedValue}</Tooltip>
      )}
    </div>
  );
};
