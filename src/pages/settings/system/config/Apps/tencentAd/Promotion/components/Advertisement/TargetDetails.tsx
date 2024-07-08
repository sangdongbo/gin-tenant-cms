import React from 'react';
import { Alert, Divider } from 'antd';
import { ProFormText, ProFormRadio } from '@ant-design/pro-components';
import { ProCard } from '@/components/BaseComponents';

const conversionOptions = [
  {
    value: 'network_attribution',
    label: '全网归因',
  },
  {
    value: 'accurate_matching',
    label: '精准匹配归因',
  },
];

const TargetDetails = () => {
  return (
    <ProCard title="目标详情">
      <ProFormRadio.Group
        label="转化归因"
        name="conversion"
        radioType="button"
        tooltip={
          <>
            全网归因表示所有数据源回传的数据都有可能匹配到你的广告；
            精准匹配归因表示只有通过你绑定的数据源回传的数据才能匹配到你的广告；
            请你充分了解后谨慎选择。
            <a href="https://e.qq.com/ads/helpcenter/detail?cid=513&pid=2014">了解更多</a>
          </>
        }
        initialValue="network_attribution"
        options={conversionOptions}
        rules={[{ required: true }]}
      />

      <Divider style={{ margin: '15px 0' }} />

      <div style={{ paddingBottom: 10, display: 'flex' }}>
        <Alert
          message="商品是对广告营销内容的详细描述，准确的商品信息将有效提升广告投放效果"
          type="info"
          showIcon
        />
      </div>
      <ProFormRadio.Group
        label="商品"
        name="commodity"
        radioType="button"
        // tooltip={<>
        //   <div>
        //     商品是对广告营销内容的详细描述，例如阅读行业的商品为小说，教育行业的商品为售卖的课程等
        //   </div>
        //   <a>查看图文说明</a>|<a href="https://e.qq.com/ads/helpcenter/detail?cid=1516&pid=4402">了解更多</a>
        // </>}
        initialValue="not"
        options={[
          {
            value: 'not',
            label: '不使用',
          },
          {
            value: 'gz2',
            label: '选择已有商品',
            disabled: true,
          },
          {
            value: 'gz3',
            label: '自动识别',
            disabled: true,
          },
        ]}
        rules={[{ required: true }]}
      />
    </ProCard>
  );
};

export default TargetDetails;
