import {
  ProFormSelect,
  ProFormSwitch,
  ProFormRadio,
  ProFormDependency,
  ProFormText,
} from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';

import { querySelectRule, getSelectRuleRule } from '../service';
import { levelOptions } from './Form';

// 需要忽略的系统字段
// export const ignoreSystemField = ['full_address', 'district', 'city', 'province'];

export default ({
  ignoreRuleName = [],
  ignoreField = [],
  nameProps,
  levelProps,
  showProps,
  requiredProps,
  ruleNameProps,
}: any) => {
  const [nameLoading, setNameLoading] = useState(true);
  const [nameOptions, setNameOptions] = useState([]);

  useEffect(() => {
    setNameLoading(true);
    querySelectRule()
      .then((data) => {
        const newData = data.filter((item: any) => !ignoreField.includes(item.value));

        setNameOptions(newData);
        setNameLoading(false);
      })
      .catch(() => setNameLoading(false));
  }, []);

  return (
    <div>
      <ProFormSelect
        name="name"
        label="联系人字段"
        options={nameOptions}
        fieldProps={{
          notFoundContent: nameLoading ? <Spin size="small" /> : null,
        }}
        rules={[
          {
            required: true,
            message: '请选择联系人字段',
          },
        ]}
        {...nameProps}
      />

      <ProFormDependency name={['name']}>
        {({ name }) => {
          const currentValueArray = nameOptions.filter((item: any) => item.value == name);
          const currentValue: any = currentValueArray[0];
          if (currentValue && currentValue?.type == 'system') {
            return (
              <ProFormText
                preserve={false}
                name="placeholder"
                label="提示语"
                fieldProps={{
                  maxLength: 64,
                }}
              />
            );
          }
          return null;
        }}
      </ProFormDependency>

      <ProFormDependency name={['name']}>
        {({ name }) => {
          if (name === 'address') {
            return (
              <ProFormRadio.Group
                preserve={false}
                name="level"
                label="精确区间"
                options={levelOptions}
                rules={[
                  {
                    required: true,
                    message: '请选择精确区间',
                  },
                ]}
                {...levelProps}
              />
            );
          }
          return null;
        }}
      </ProFormDependency>

      <ProFormDependency name={['name']}>
        {({ name }) => {
          if (name === 'email') {
            return (
              <ProFormSelect
                preserve={false}
                name="rule_name"
                label="验证方式"
                rules={[{ required: true, message: '请选择验证方式' }]}
                request={async (params) => {
                  const data = await getSelectRuleRule(params);
                  const newData = data.filter((item: any) => !ignoreRuleName.includes(item.value));
                  return newData;
                }}
                params={{
                  name: 'email',
                }}
                {...ruleNameProps}
              />
            );
          }

          if (name === 'phone') {
            return (
              <ProFormSelect
                preserve={false}
                name="rule_name"
                label="验证方式"
                rules={[{ required: true, message: '请选择验证方式' }]}
                request={async (params) => {
                  const data = await getSelectRuleRule(params);
                  const newData = data.filter((item: any) => !ignoreRuleName.includes(item.value));
                  return newData;
                }}
                params={{
                  name: 'phone',
                }}
                {...ruleNameProps}
              />
            );
          }
          return null;
        }}
      </ProFormDependency>

      <ProFormSwitch
        initialValue={1}
        label="是否展示"
        name="show"
        fieldProps={{ checkedChildren: '展示', unCheckedChildren: '不展示' }}
        formItemProps={{ getValueFromEvent: (e) => (e ? 1 : 0) }}
        rules={[{ required: true }]}
        {...showProps}
      />
      <ProFormSwitch
        initialValue={1}
        label="是否必填"
        name="required"
        fieldProps={{ checkedChildren: '必填', unCheckedChildren: '非必填' }}
        formItemProps={{ getValueFromEvent: (e) => (e ? 1 : 0) }}
        rules={[{ required: true }]}
        {...requiredProps}
      />
    </div>
  );
};
