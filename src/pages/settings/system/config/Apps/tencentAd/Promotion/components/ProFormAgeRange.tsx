import { useEffect, useState } from 'react';
import { Select, Space } from "antd";
import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';

interface PropsType extends ProFormItemProps {

}

const options = [
  {
    "label": "0岁",
    "value": 0
  },
  {
    "label": "1岁",
    "value": 1
  },
  {
    "label": "2岁",
    "value": 2
  },
  {
    "label": "3岁",
    "value": 3
  },
  {
    "label": "4岁",
    "value": 4
  },
  {
    "label": "5岁",
    "value": 5
  },
  {
    "label": "6岁",
    "value": 6
  },
  {
    "label": "7岁",
    "value": 7
  },
  {
    "label": "8岁",
    "value": 8
  },
  {
    "label": "9岁",
    "value": 9
  },
  {
    "label": "10岁",
    "value": 10
  },
  {
    "label": "11岁",
    "value": 11
  },
  {
    "label": "12岁",
    "value": 12
  },
  {
    "label": "13岁",
    "value": 13
  },
  {
    "label": "14岁",
    "value": 14
  },
  {
    "label": "15岁",
    "value": 15
  },
  {
    "label": "16岁",
    "value": 16
  },
  {
    "label": "17岁",
    "value": 17
  },
  {
    "label": "18岁",
    "value": 18
  },
  {
    "label": "19岁",
    "value": 19
  },
  {
    "label": "20岁",
    "value": 20
  },
  {
    "label": "21岁",
    "value": 21
  },
  {
    "label": "22岁",
    "value": 22
  },
  {
    "label": "23岁",
    "value": 23
  },
  {
    "label": "24岁",
    "value": 24
  },
  {
    "label": "25岁",
    "value": 25
  },
  {
    "label": "26岁",
    "value": 26
  },
  {
    "label": "27岁",
    "value": 27
  },
  {
    "label": "28岁",
    "value": 28
  },
  {
    "label": "29岁",
    "value": 29
  },
  {
    "label": "30岁",
    "value": 30
  },
  {
    "label": "31岁",
    "value": 31
  },
  {
    "label": "32岁",
    "value": 32
  },
  {
    "label": "33岁",
    "value": 33
  },
  {
    "label": "34岁",
    "value": 34
  },
  {
    "label": "35岁",
    "value": 35
  },
  {
    "label": "36岁",
    "value": 36
  },
  {
    "label": "37岁",
    "value": 37
  },
  {
    "label": "38岁",
    "value": 38
  },
  {
    "label": "39岁",
    "value": 39
  },
  {
    "label": "40岁",
    "value": 40
  },
  {
    "label": "41岁",
    "value": 41
  },
  {
    "label": "42岁",
    "value": 42
  },
  {
    "label": "43岁",
    "value": 43
  },
  {
    "label": "44岁",
    "value": 44
  },
  {
    "label": "45岁",
    "value": 45
  },
  {
    "label": "46岁",
    "value": 46
  },
  {
    "label": "47岁",
    "value": 47
  },
  {
    "label": "48岁",
    "value": 48
  },
  {
    "label": "49岁",
    "value": 49
  },
  {
    "label": "50岁",
    "value": 50
  },
  {
    "label": "51岁",
    "value": 51
  },
  {
    "label": "52岁",
    "value": 52
  },
  {
    "label": "53岁",
    "value": 53
  },
  {
    "label": "54岁",
    "value": 54
  },
  {
    "label": "55岁",
    "value": 55
  },
  {
    "label": "56岁",
    "value": 56
  },
  {
    "label": "57岁",
    "value": 57
  },
  {
    "label": "58岁",
    "value": 58
  },
  {
    "label": "59岁",
    "value": 59
  },
  {
    "label": "60岁",
    "value": 60
  },
  {
    "label": "61岁",
    "value": 61
  },
  {
    "label": "62岁",
    "value": 62
  },
  {
    "label": "63岁",
    "value": 63
  },
  {
    "label": "64岁",
    "value": 64
  },
  {
    "label": "65岁",
    "value": 65
  },
  {
    "label": "66岁及以上",
    "value": 66
  }
]


export const AgeRangeBasics = ({ width, value, onChange, ...props }: any) => {
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  useEffect(() => {
    if (min != null && max != null) onChange({ min, max });
  }, [min, max])

  return (
    <Space>
      <Select
        placeholder="请选择"
        {...props}
        options={options.map(item => ({ ...item, disabled: max ? item.value > max : false }))}
        onChange={setMin}
      />
      -
      <Select
        placeholder="请选择"
        {...props}
        options={options.map(item => ({ ...item, disabled: min ? item.value < min : false }))}
        onChange={setMax}
      />
    </Space>
  );
};


const ProFormAgeRange = (props: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <AgeRangeBasics {...props} />
    </ProForm.Item>
  );
};

export default ProFormAgeRange;
