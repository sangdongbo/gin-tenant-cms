import React, { useEffect, useRef, useState } from 'react';
import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProForm, ProCard } from '@ant-design/pro-components';
import { Popover, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRequest } from 'ahooks';
import style from './style.less';

interface PropsType extends ProFormItemProps {
  options: any[];
  params?: any;
  request?: (params: any) => any;
  fieldProps?: any;
}

const systemFieldsOptions = [
  {
    label: 'OpenlD',
    value: 'openid',
  },
  {
    label: 'UnionlD',
    value: 'unionid',
  },
  {
    label: '公众号',
    value: 'offiaccount',
  },
  {
    label: '活动名称',
    value: 'utm_campaign',
  },
  {
    label: '广告来源',
    value: 'utm_source',
  },
  // {
  //   label: '广告媒介',
  //   value: 'utm_medium',
  // },
  // {
  //   label: '广告关键词',
  //   value: 'utm_term',
  // },
  // {
  //   label: '广告内容',
  //   value: 'utm_content',
  // }
];

const CustomNotice = ({
  options: baseOptions,
  params,
  request,
  debounceWait = 0,
  handelData,
  value,
  onChange,
  ...props
}: any) => {
  const [options, setOptions] = useState<any>({
    fields: baseOptions || [],
    system_fields: systemFieldsOptions,
  });

  const { loading, run } = useRequest(() => request?.(params), {
    debounceWait,
    manual: true,
    onSuccess(res: any[]) {
      setOptions({
        ...options,
        fields: handelData ? handelData(res, params) : res,
      });
    },
  });

  const onBaseChange = (list: any[], type: 'fields' | 'system_fields') => {
    const values = JSON.parse(JSON.stringify(value || {}));
    values[type] = list;
    onChange(values);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent, type: 'fields' | 'system_fields') => {
    const values = JSON.parse(JSON.stringify(value || {}));
    if (e.target.checked) {
      values[type] = options[type].map((item: any) => item?.value);
    } else {
      values[type] = [];
    }
    onChange(values);
  };

  const checkAll = (type: 'fields' | 'system_fields') => {
    const values = JSON.parse(JSON.stringify(value || {}));
    return options[type]?.length === values[type]?.length;
  };

  const indeterminate = (type: 'fields' | 'system_fields') => {
    const values = JSON.parse(JSON.stringify(value || {}));
    return values[type]?.length > 0 && values[type]?.length < options[type]?.length;
  };

  const content = () => {
    return (
      <ProCard
        style={{ width: 450 }}
        bodyStyle={{ padding: 0 }}
        bordered
        headerBordered
        split="vertical"
      >
        <ProCard
          title="注册字段"
          loading={loading}
          extra={
            <Checkbox
              indeterminate={indeterminate('fields')}
              onChange={(e) => onCheckAllChange(e, 'fields')}
              checked={checkAll('fields')}
            >
              全选
            </Checkbox>
          }
        >
          <Checkbox.Group
            className="reset-checkbox-group-lineheight"
            options={options.fields}
            value={value?.fields || []}
            onChange={(e) => onBaseChange(e, 'fields')}
          />
        </ProCard>
        <ProCard
          title="系统字段"
          loading={loading}
          extra={
            <Checkbox
              indeterminate={indeterminate('system_fields')}
              onChange={(e) => onCheckAllChange(e, 'system_fields')}
              checked={checkAll('system_fields')}
            >
              全选
            </Checkbox>
          }
        >
          <Checkbox.Group
            className="reset-checkbox-group-lineheight"
            options={options.system_fields}
            value={value?.system_fields || []}
            onChange={(e) => onBaseChange(e, 'system_fields')}
          />
        </ProCard>
      </ProCard>
    );
  };

  useEffect(() => {
    if (request) run();
  }, [params]);

  useEffect(() => {
    setOptions({
      ...options,
      fields: baseOptions || [],
    });
  }, [baseOptions]);

  return (
    <Popover
      placement="bottom"
      arrow={false}
      trigger="click"
      overlayInnerStyle={{ padding: 0 }}
      content={content}
      {...props}
    >
      <div className={style['custom-notice']}>点击设置</div>
    </Popover>
  );
};

const ProFormNotice = ({ params, options, request, fieldProps, ...props }: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <CustomNotice options={options} params={params} request={request} {...fieldProps} />
    </ProForm.Item>
  );
};

ProFormNotice.systemFieldsOptions = systemFieldsOptions;

export default ProFormNotice;
