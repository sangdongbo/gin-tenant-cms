import React from "react";
import { ProFormRadio, ProFormDependency } from '@ant-design/pro-components';
import { ProCard, ProFormSelectPromotionPlan } from '@/components/BaseComponents';
import { Typography } from 'antd';
import Plan from '../components/Plan';

const { Title } = Typography;

const campaignTypeOptions = [
  {
    label: '选择已有推广计划',
    value: 'select',
  },
  {
    label: '新建推广计划',
    value: 'add',
  },
];

const Step1 = () => {
  return (
    <>
      <Title level={5}>
        推广计划
      </Title>
      <ProFormRadio.Group
        name="type"
        label="是否新创建计划"
        radioType="button"
        options={campaignTypeOptions}
        rules={[
          {
            required: true,
          }
        ]}
      />

      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (type == 'select') {
            return (
              <div style={{ paddingBottom: 12 }}>
                <ProCard>
                  <ProFormSelectPromotionPlan
                    label="推广计划"
                    name="promotion_plan_id"
                    filedSelectProps={{
                      placeholder: '请选择推广计划'
                    }}
                    formItemProps={{
                      style: {
                        marginBottom: 0,
                      }
                    }}
                    rules={[{ required: true }]}
                  />
                </ProCard>
              </div>
            );
          };
          if (type == 'add') return <Plan />;
          return null;
        }}
      </ProFormDependency>
    </>
  );
};

export default Step1;
