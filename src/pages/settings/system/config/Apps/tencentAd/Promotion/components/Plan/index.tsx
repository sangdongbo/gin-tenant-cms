import React from "react";
import { Typography } from 'antd';
import { ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { ProCard, ProFormPromotedObject, ProFormCustomSelect } from '@/components/BaseComponents';

const { Title } = Typography;

export const campaignTypeOptions = [
  {
    label: '展示广告计划',
    value: 'CAMPAIGN_TYPE_NORMAL',
  },
  {
    label: '搜索广告计划',
    value: 'CAMPAIGN_TYPE_SEARCH',
  },
];

export const promotedObjectTypeOptions = [
  // {
  //   iconName: 'product',
  //   // relation: ['CAMPAIGN_TYPE_NORMAL', 'CAMPAIGN_TYPE_SEARCH'],// 没有 relation 表示所有权限全有
  //   label: '商品推广',
  //   value: 'PROMOTED_OBJECT_TYPE_ECOMMERCE',
  //   desc: '推广线上商品，带来更多客户和订单',
  //   tips: '使用小程序落地页，可选择推广目标：商品推广、品牌活动推广、销售线索收集',
  // },
  // {
  //   iconName: 'app',
  //   label: '应用推广',
  //   childrens: [
  //     {
  //       label: 'iOS应用',
  //       value: 'PROMOTED_OBJECT_TYPE_APP_IOS',
  //     },
  //     {
  //       label: 'Android应用',
  //       value: 'PROMOTED_OBJECT_TYPE_APP_ANDROID',
  //     },
  //     {
  //       label: 'Android应用(应用宝)',
  //       relation: ['CAMPAIGN_TYPE_NORMAL'],
  //       value: 'PROMOTED_OBJECT_TYPE_APP_ANDROID_MYAPP',
  //     }
  //   ],
  //   desc: '吸引更多用户下载、安装、转化',
  //   tips: '使用小程序落地页，可选择推广目标：商品推广、品牌活动推广、销售线索收集',
  // },
  {
    iconName: 'leads',
    label: '销售线索收集',
    value: 'PROMOTED_OBJECT_TYPE_LEAD_AD',
    desc: '收集意向客户商机，开发潜在客户',
    tips: '使用小程序落地页，可选择推广目标：商品推广、品牌活动推广、销售线索收集',
  },
  {
    iconName: 'wevideo',
    relation: ['CAMPAIGN_TYPE_NORMAL'],
    label: '视频号推广',
    value: 'PROMOTED_OBJECT_TYPE_WECHAT_CHANNELS',
    desc: '推广你的视频号动态或直播，吸引更多播放',
    tips: '查看 <a target="_blank" href="https://e.qq.com/ads/helpcenter/detail?cid=502&pid=6955">“视频号推广投放指引”</a>',
  },
  {
    iconName: 'official',
    relation: ['CAMPAIGN_TYPE_NORMAL'],
    label: '公众号推广',
    value: 'PROMOTED_OBJECT_TYPE_WECHAT_OFFICIAL_ACCOUNT',
    desc: '推广你的公众号，吸引更多关注',
    tips: '查看 <a target="_blank" href="https://e.qq.com/ads/helpcenter/detail?cid=502&pid=6950">“公众号推广投放指引”</a>',
  },
  {
    iconName: 'brand',
    label: '品牌活动推广',
    value: 'PROMOTED_OBJECT_TYPE_LINK_WECHAT',
    desc: '扩大品牌影响力，吸引更多用户参与活动',
    tips: '使用小程序落地页，可选择推广目标：商品推广、品牌活动推广、销售线索收集',
  },
  // {
  //   iconName: 'game',
  //   label: '小游戏推广',
  //   childrens: [
  //     {
  //       label: '微信小游戏',
  //       value: 'PROMOTED_OBJECT_TYPE_MINI_GAME_WECHAT',
  //     },
  //     {
  //       label: 'QQ小游戏',
  //       value: 'PROMOTED_OBJECT_TYPE_MINI_GAME_QQ',
  //     }
  //   ],
  //   desc: '吸引更多用户玩小游戏',
  //   tips: '使用小程序落地页，可选择推广目标：商品推广、品牌活动推广、销售线索收集',
  // },
  // {
  //   iconName: 'store',
  //   relation: ['CAMPAIGN_TYPE_NORMAL'],
  //   label: '门店推广',
  //   value: 'PROMOTED_OBJECT_TYPE_LOCAL_ADS_WECHAT',
  //   desc: '推广本地门店，吸引周边用户到店消费或参加活动',
  //   tips: '使用小程序落地页，可选择推广目标：商品推广、品牌活动推广、销售线索收集',
  // }
];

export const speedModeOptions = [
  {
    label: '标准投放',
    value: 'SPEED_MODE_STANDARD',
  },
  {
    label: '加速投放',
    value: 'SPEED_MODE_FAST',
  },
];

export const dailyBudgetOptions = [
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
        placeholder: '此计划内所有广告的每日最高总花费',
        addonAfter: "元/天",
      },
      desc: '每日预算 50-40,000,000元/天',
    },
  }
];

export const totalBudgetOptions = [
  {
    label: '不限',
    value: 0,
  },
  {
    label: '指定总预算',
    fieldFormProps: {
      width: 328,// 不能使用 md 使用md后会导致 addonAfter 宽度设置错误
      valueType: "money",
      fieldProps: {
        addonAfter: "元",
        placeholder: '此计划内所有广告的最高总花费',
      },
      desc: '总预算 50-40,000,000元',
    },
  }
];

const PromotionPlan = ({ title }: any) => {

  return (
    <div style={{ paddingBottom: 12 }}>
      {
        title ? (
          <Title level={5}>
            {title}
          </Title>
        ) : null
      }
      <ProCard>
        <ProFormRadio.Group
          name="campaign_type"
          label="计划类型"
          radioType="button"
          options={campaignTypeOptions}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
            },
          ]}
        />

        <ProFormPromotedObject
          name="promoted_object_type"
          label="推广目标"
          filedDependencyProps={{
            name: 'campaign_type'
          }}
          options={promotedObjectTypeOptions}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
            },
          ]}
        />

        <ProFormRadio.Group
          name="speed_mode"
          label="投放方式"
          options={speedModeOptions}
          radioType="button"
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
            },
          ]}
        />

        <ProFormCustomSelect
          name="daily_budget"
          label="计划日预算"
          options={dailyBudgetOptions}
          rules={[
            {
              required: true,
            }
          ]}
        />
        <ProFormCustomSelect
          name="total_budget"
          label="计划总预算"
          options={totalBudgetOptions}
          rules={[
            {
              required: true,
            }
          ]}
        />

        {/* <ProFormBudget
          name="daily_budget"
          label="计划日预算"
          options={dailyBudgetOptions}
          rules={[
            {
              required: true,
            }
          ]}
        />

        <ProFormBudget
          name="total_budget"
          label="计划总预算"
          options={totalBudgetOptions}
          rules={[
            {
              required: true,
            }
          ]}
        /> */}

        <ProFormText
          width="xl"
          name="campaign_name"
          label="推广计划名称"
          fieldProps={{ showCount: true, maxLength: 60 }}
          rules={[
            {
              required: true,
            },
            {
              whitespace: true,
            },
          ]}
        />
      </ProCard>
    </div>
  );
};

export default PromotionPlan;
