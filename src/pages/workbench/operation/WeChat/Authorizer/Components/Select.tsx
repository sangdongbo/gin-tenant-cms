import { Select } from 'antd';
import { useState, useEffect } from 'react';
import { querySelectRule } from '../service';

export default ({ selectFirst, defaultValue, parmas, ...props }: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    querySelectRule({
      // 'filter[type]': 1,
      ...parmas,
    }).then((result) => {
      if (selectFirst && result.length) {
        props.onChange(result[0].value);
      };
      setData(result);
    });
  }, []);

  return (
    <>
      <Select
        style={{ minWidth: 100 }}
        {...props}
      >
        {data.map((item: any) => (
          <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
        ))}
      </Select>
    </>
  );
};
