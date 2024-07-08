import React from "react";
import { ProFormRadio } from '@ant-design/pro-components';
import { ProFormCustomSelect } from '@/components/BaseComponents';
import { AgeRangeBasics } from "../ProFormAgeRange";

const addressOptions = [
  {
    label: '不限',
    value: '1',
  },
  {
    label: '按区域',
    value: '2',
    disabled: true,
  },
  {
    label: '从地图选择',
    value: '3',
    disabled: true,
  },
];

const ageOptions = [
  {
    label: '不限',
    value: '1',
  },
  {
    label: '14~18岁',
    value: '2',
  },
  {
    label: '19~24岁',
    value: '3',
  },
  {
    label: '25~29岁',
    value: '4',
  },
  {
    label: '30~39岁',
    value: '5',
  },
  {
    label: '40~49岁',
    value: '6',
  },
  {
    label: '50岁及以上',
    value: '7',
  },
  {
    label: '自定义',
    fieldFormProps: {
      render: (props: any) => {
        return <AgeRangeBasics
          style={{
            width: 116
          }}
          {...props}
        />
      }
    }
  },
];

const sexOptions = [
  {
    label: '不限',
    value: '1',
  },
  {
    label: '男',
    value: '2',
  },
  {
    label: '女',
    value: '3',
  }
];

const osOptions = [
  {
    label: '不限',
    value: '1',
  },
  {
    label: '自定义',
    value: '2',
    disabled: true,
  }
];

const connectiontypeOptions = [
  {
    label: '不限',
    value: '1',
  },
  {
    label: 'Wi-Fi',
    value: '2',
  },
  {
    label: '5G',
    value: '3',
  },
  {
    label: '4G',
    value: '4',
  },
  {
    label: '3G',
    value: '5',
  },
  {
    label: '2G',
    value: '6',
  }
];

const audienceOptions = [
  {
    label: '不限',
    value: '1',
  },
  {
    label: '定向人群',
    value: '2',
    disabled: true,
  },
  {
    label: '定向人群',
    value: '3',
    disabled: true,
  },
];

const excludeConvertedAudienceOptions = [
  {
    label: '不限',
    value: '1',
  },
  {
    label: '同计划广告',
    fieldFormProps: {
      valueType: "radio",
      valueEnum: {
        1: '优化目标',
        2: {
          text: '自定义',
          disabled: true,
        },
      },
    },
  },
  {
    label: '同账户广告',
    fieldFormProps: {
      valueType: "radio",
      valueEnum: {
        1: '优化目标',
        2: {
          text: '自定义',
          disabled: true,
        },
      },
    },
  },
  {
    label: '同商务管家广告',
    fieldFormProps: {
      valueType: "radio",
      valueEnum: {
        1: '优化目标',
        2: {
          text: '自定义',
          disabled: true,
        },
      },
    },
  },
  {
    label: '同主体广告',
    fieldFormProps: {
      valueType: "radio",
      valueEnum: {
        1: '优化目标',
        2: {
          text: '自定义',
          disabled: true,
        },
      },
    },
  },
  {
    label: '同应用',
    fieldFormProps: {
      valueType: "radio",
      valueEnum: {
        1: '优化目标',
        2: {
          text: '自定义',
          disabled: true,
        },
      },
    },
  },
];

const CreateDirectional = () => {

  return (
    <div>
      <ProFormRadio.Group
        name="address"
        label="地理位置"
        radioType="button"
        initialValue="1"
        options={addressOptions}
        rules={[
          {
            required: true,
          }
        ]}
      />
      {/* <ProFormRadio.Group
        name="age"
        label="年龄"
        radioType="button"
        initialValue="1"
        options={ageOptions}
      /> */}
      <ProFormCustomSelect
        name="age"
        label="年龄"
        initialValue="1"
        options={ageOptions}
        tooltip="由于国家政策，若投放酒类广告，系统只会向 18 岁以上受众展示"
        rules={[
          {
            required: true,
          }
        ]}
      />
      <ProFormRadio.Group
        name="sex"
        label="性别"
        radioType="button"
        initialValue="1"
        options={sexOptions}
        rules={[
          {
            required: true,
          }
        ]}
      />
      <ProFormRadio.Group
        name="os"
        label="操作系统版本"
        radioType="button"
        initialValue="1"
        options={osOptions}
        rules={[
          {
            required: true,
          }
        ]}
      />
      <ProFormRadio.Group
        name="connectiontype"
        label="联网方式"
        radioType="button"
        initialValue="1"
        options={connectiontypeOptions}
        rules={[
          {
            required: true,
          }
        ]}
      />
      <ProFormRadio.Group
        name="audience"
        label="自定义人群"
        radioType="button"
        initialValue="1"
        options={audienceOptions}
        rules={[
          {
            required: true,
          }
        ]}
      />

      <ProFormCustomSelect
        name="exclude_converted_audience"
        label="排除已转化用户"
        options={excludeConvertedAudienceOptions}
        rules={[
          {
            required: true,
          }
        ]}
      />
    </div>
  )
}

export default CreateDirectional
