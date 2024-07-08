import ProCard from '@/components/BaseComponents/ProCard';

import { Radio, Space, Spin, Select } from 'antd';
import dayjs from 'dayjs';
import BaseDateRangePicker from './BaseDateRangePicker';
import ProTitle from '../BaseComponents/ProTitle';

interface CustomFormsProps {
  type: 'select' | 'radio',
  onChange?: any;
  onHandle?: (event: any) => any;
}

const CustomForms = ({ type, onHandle, ...props }: CustomFormsProps) => {

  if (type == 'select') {
    return (
      <Select
        style={{ width: 120 }}
        {...props}
      />
    );
  };

  if (type == 'radio') {
    return (
      <Radio.Group
        {...props}
        onChange={(e) => {
          props?.onChange(onHandle?.(e.target.value) || e.target.value);
        }}
      />
    );
  };

  if (type == "range-picker") {
    return (
      <BaseDateRangePicker
        {...props}
        onChange={(e: any) => {
          props?.onChange(onHandle?.(e) || e);
        }}
      />
    )
  }

  return null;
}

export default ({
  title,
  children,
  loading = false,
  extra,
  hover = true,
  titleIocn,
  row = 1,
  style = {},
  ...props
}: any) => {
  const extraProps: any = {};
  if (title) {
    extraProps.title = <ProTitle titleIocn={titleIocn} title={title} />;
  }
  if (extra) {
    if (extra?.data?.options) {
      console.warn('BaseProCard 的 extra.data.options 方法准备废弃！');
    };
    extraProps.extra = (
      <Space>
        {/* 准备废弃 */}
        {extra?.data?.options ? (
          <Radio.Group
            buttonStyle="solid"
            size="small"
            defaultValue={extra.data.options[0].value}
            onChange={(e) => {
              const value = { ...extra.params, type: e.target.value };
              extra.onChange(value);
            }}
            optionType="button"
            options={extra.data.options}
          />
        ) : null}
        {extra?.customForms?.map((item: any) => {
          return <CustomForms
            value={extra?.params[item.name] || ''}
            {...item}
            onChange={(e: any) => {
              const value = {
                ...extra.params,
                [item.name]: e,
              };
              extra.onChange(value);
            }}
          />
        })}
        {extra?.params?.star_time ? (
          <BaseDateRangePicker
            separator="至"
            defaultValue={[dayjs(extra.params.star_time), dayjs(extra.params.end_time)]}
            onChange={(e: any) => {
              const value = {
                ...extra.params,
              };
              value.star_time = e[0].format('YYYY-MM-DD');
              value.end_time = e[1].format('YYYY-MM-DD');
              extra.onChange(value);
            }}
          />
        ) : null}

        {extra?.right?.map((item: any) => {
          return item;
        })}
      </Space>
    );
  }

  return (
    <Spin spinning={loading}>
      <div className={hover ? 'card-border-hover' : ''} style={{ border: '1px solid transparent' }}>
        <ProCard
          style={{
            height: row * 140 + (row - 1) * 24 + (row - 1) * 2,
            ...style,
          }}
          headStyle={{
            padding: '14px 20px 0'
          }}
          bodyStyle={{
            padding: '14px 20px',
          }}
          {...extraProps}
          // size="small"
          {...props}
        >
          {children}
        </ProCard>
      </div>
    </Spin>
  );
};
