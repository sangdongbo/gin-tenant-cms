import { ModalForm, ProForm, ProFormSelect } from '@ant-design/pro-components';
import Select from '@/pages/workbench/operation/WeChat/Authorizer/Components/Select';
import { ProFormAutoComplete } from '../BaseComponents';

import { selectRule } from '@/services/tenant/utm/select/utm_campaign/api';

export default (props: any) => {
  return (
    <ModalForm {...props}>
      <ProForm.Item name="appid" label="公众号">
        <Select
          selectFirst
          allowClear
          parmas={{
            'filter[type]': 1,
          }}
        />
      </ProForm.Item>
      <ProFormSelect
        name="utm_source"
        label="广告来源"
        rules={[{ required: true, message: '请选择广告来源' }]}
        valueEnum={{
          腾讯: '腾讯',
          字节: '字节',
          百度: '百度',
          领英: '领英',
        }}
        tooltip="一般用于标识流量来源，引荐来源：腾讯、字节、百度、领英"
      />
      <ProFormAutoComplete
        name="utm_campaign"
        label="活动名称"
        rules={[{ required: true }]}
        tooltip="一般用于标识推广活动名称，例如周末大促，双 11 活动等"
        params={{
          source: 'utm_campaign',
        }}
        request={selectRule}
      />
      <ProFormAutoComplete
        name="utm_medium"
        label="广告媒介"
        tooltip="一般用于标识广告媒介，营销媒介：cpc、banner、edm"
        rules={[{ whitespace: true }]}
        params={{
          source: 'utm_medium',
        }}
        request={selectRule}
      />
      <ProFormAutoComplete
        name="utm_term"
        label="关键词"
        tooltip="一般用于标识付费关键字，主要适用于 SEM"
        rules={[{ whitespace: true }]}
        params={{
          source: 'utm_term',
        }}
        request={selectRule}
      />
      <ProFormAutoComplete
        name="utm_content"
        label="广告内容"
        tooltip="一般用于区分广告，主要适用 A/B-test 和按内容定位广告"
        rules={[{ whitespace: true }]}
        params={{
          source: 'utm_content',
        }}
        request={selectRule}
      />
    </ModalForm>
  );
};
