import React from "react";
import type { ProFormItemProps, ProFormDependencyProps } from '@ant-design/pro-components';
import { ProForm, ProFormDependency } from '@ant-design/pro-components';
import type { SelectProps } from 'antd';
import { Select, Descriptions, Divider } from 'antd';


interface PropsType extends ProFormItemProps {
  filedSelectProps?: SelectProps;
}

const getCompleteInfo = (options: any[], value: any) => {
  const data = options.filter(item => item.value === value);
  if (data.length) {
    return data[0];
  };
  return null;
};

const SelectPromotionPlan = ({ filedSelectProps, value, onChange }: any) => {
  const options = [
    {
      value: '1',
      label: '推广计划(应用推广-IOS)',
      details: {
        type: '展示广告计划',
        target: '应用推广-iOS应用',
        dailyBudget: '不限',
        generalBudget: '不限',
        deliveryForm: '加速投放',
      }
    },
    {
      value: '2',
      label: '推广计划',
      details: {
        type: '展示广告计划',
        target: '销售线索收集',
        dailyBudget: '不限',
        generalBudget: '不限',
        deliveryForm: '标准投放',
      }
    },
  ];

  const info = getCompleteInfo(options, value);

  return (
    <div>
      <Select
        options={options}
        {...filedSelectProps}
        value={value}
        onChange={(val) => {
          onChange(val);
        }}
      />
      {
        info ? (
          <>
            <Divider />
            <Descriptions column={1}>
              <Descriptions.Item label="计划类型">{info?.details?.type}</Descriptions.Item>
              <Descriptions.Item label="推广目标">{info?.details?.target}</Descriptions.Item>
              <Descriptions.Item label="计划日预算">{info?.details?.dailyBudget}</Descriptions.Item>
              <Descriptions.Item label="计划总预算">{info?.details?.generalBudget}</Descriptions.Item>
              <Descriptions.Item label="投放形式">{info?.details?.deliveryForm}</Descriptions.Item>
            </Descriptions>
          </>
        ) : null
      }
    </div>
  );
};

const ProFormSelectPromotionPlan = (props: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <SelectPromotionPlan {...props} />
    </ProForm.Item>
  );
};

export default ProFormSelectPromotionPlan;
