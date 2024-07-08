import React from "react";
import { Divider, Alert } from 'antd';
import { ProFormRadio, ProFormSelect, ProFormSwitch, ProFormDependency } from '@ant-design/pro-components';
import { ProCard, ProFormCustomSelect } from '@/components/BaseComponents';
import ProFormOffer from "../ProFormOffer";

export const releaseDateOptions = [
  {
    label: '长期投放',
    fieldFormProps: {
      valueType: "date",
      fieldProps: {
        allowClear: false,
        placeholder: '开始时间',
      },
    },
  },
  {
    label: '指定开始日期和结束日期',
    fieldFormProps: {
      valueType: "dateRange",
      fieldProps: {
        allowClear: false,
      },
    },
  }
];

export const releaseTimeOptions = [
  {
    label: '全天',
    value: 0,
  },
  {
    label: '指定开始日期和结束日期',
    fieldFormProps: {
      valueType: "timeRange",
      fieldProps: {
        format: 'HH:mm',
        allowClear: false,
      },
    },
  },
  {
    label: '指定多个时段',
    value: 2,
    disabled: true,
  },
];

export const biddingMethodOptions = [
  {
    label: 'oCPM',
    value: '1',
  },
  {
    label: 'oCPC',
    value: '2',
  },
  {
    label: 'CPM',
    value: '3',
  },
  {
    label: 'CPC',
    value: '4',
  },
];

export const optimizerGoalOptions = [
  {
    label: '表单预约',
    value: '1',
  },
  {
    label: '付费',
    value: '2',
  },
  {
    label: '注册',
    value: '3',
  },
  {
    label: '点击',
    value: '4',
  },
  {
    label: '综合线索收集',
    value: '5',
  },
  {
    label: '提现',
    value: '6',
  },
];

export const bidTypeOptions = [
  {
    label: '手动出价',
    value: '1',
  },
  {
    label: '自动出价',
    value: '2',
  },
];

export const biddingStrategyOptions = [
  {
    label: '稳定拿量',
    value: '1',
  },
  {
    label: '优先拿量',
    value: '2',
  },
  {
    label: '控制成本上限',
    value: '3',
  },
];

export const advertisingDayBudgetOptions = [
  {
    label: '不限',
    value: 0,
  },
  {
    label: '指定日预算',
    fieldFormProps: {
      width: 328,// 不能使用 md 使用md后会导致 addonAfter 宽度设置错误
      valueType: 'money',
      fieldProps: {
        placeholder: '广告的每日最高花费',
        addonAfter: "元/天",
      },
      desc: '每日预算 50-40,000,000元/天',
    },
  }
];

const ScheduledBid = () => {

  return (
    <ProCard title="排期与出价">
      <ProFormCustomSelect
        name="release_date"
        label="投放日期"
        options={releaseDateOptions}
        rules={[
          {
            required: true,
          }
        ]}
      />

      <ProFormCustomSelect
        name="release_time"
        label="投放时间"
        options={releaseTimeOptions}
        rules={[
          {
            required: true,
          }
        ]}
      />

      <Divider />

      <div style={{ display: 'flex', paddingBottom: 10 }}>
        <Alert
          message={<>
            <div>如需投放视频创意形式，出价方式请选择CPM或oCPM计费；</div>
            <div>仅当出价方式选择CPC、 CPM或oCPM（且优化目标为“点击”）时，你可以同时使用“行为兴趣意向”定向、“二方人群”进行投放。</div>
          </>}
          type="info"
          showIcon
        />
      </div>

      <ProFormRadio.Group
        name="bidding_method"
        label="出价方式"
        radioType="button"
        initialValue="1"
        options={biddingMethodOptions}
        rules={[
          {
            required: true,
          }
        ]}
      />

      <ProFormDependency name={['bidding_method']}>
        {({ bidding_method }) => {
          if (['1', '2'].includes(bidding_method)) {
            return (
              <>
                <ProFormSelect
                  width="md"
                  name="optimizer_goal"
                  label="优化目标"
                  options={optimizerGoalOptions}
                  placeholder="请选择"
                  rules={[{ required: true }]}
                />

                <ProFormRadio.Group
                  name="bid_type"
                  label="出价类型"
                  radioType="button"
                  initialValue="1"
                  options={bidTypeOptions}
                  rules={[{ required: true }]}
                />

                <ProFormRadio.Group
                  name="bidding_strategy"
                  label="出价策略"
                  radioType="button"
                  initialValue="1"
                  options={biddingStrategyOptions}
                  rules={[{ required: true }]}
                />
              </>
            );
          };

          return null;
        }}
      </ProFormDependency>

      <ProFormOffer
        width="md"
        name="offer"
        label="出价"
        rules={[{ required: true }]}
      />

      <ProFormDependency name={['bidding_method']}>
        {({ bidding_method }) => {
          if (['1', '2'].includes(bidding_method)) {
            return (
              <>
                <ProFormSwitch
                  name="bid_by_city"
                  label="分城市出价"
                  initialValue={false}
                  disabled
                  fieldProps={{
                    checkedChildren: '开启',
                    unCheckedChildren: '关闭',
                  }}
                />

                <ProFormSwitch
                  name="bid_by_city"
                  label="分城市出价"
                  initialValue={false}
                  disabled
                  fieldProps={{
                    checkedChildren: '开启',
                    unCheckedChildren: '关闭',
                  }}
                />

                <ProFormSwitch
                  name="one_button_counting"
                  label="一键起量"
                  initialValue={false}
                  disabled
                  fieldProps={{
                    checkedChildren: '开启',
                    unCheckedChildren: '关闭',
                  }}
                />

                <ProFormSwitch
                  name="deep_conversion_optimization"
                  label="深度转化优化"
                  initialValue={false}
                  disabled
                  fieldProps={{
                    checkedChildren: '开启',
                    unCheckedChildren: '关闭',
                  }}
                />
              </>
            )
          };
          return null;
        }}
      </ProFormDependency>

      <Divider />

      <ProFormCustomSelect
        name="advertising_day_budget"
        label="广告日预算"
        options={advertisingDayBudgetOptions}
        rules={[
          {
            required: true,
          }
        ]}
      />
    </ProCard>
  );
};

export default ScheduledBid;
