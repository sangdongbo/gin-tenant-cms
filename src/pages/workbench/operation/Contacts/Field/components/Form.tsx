import { DownCircleOutlined, UpCircleOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormDependency,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormCheckbox,
  ProFormDigit,
  ProCard,
} from '@ant-design/pro-components';
import TreeSelectTag from '@/pages/workbench/operation/Tag/Components/TreeSelectTag';

import { Button, Space, ConfigProvider } from 'antd';
import { queryRuleRule } from '../service';
import { useEffect, useState } from 'react';

// 系统预设字段
export const systemFormType = [
  {
    label: '城市',
    value: 'address',
  },
];

export const levelOptions = [
  {
    label: '省',
    value: 'province',
  },
  {
    label: '市',
    value: 'city',
  },
  {
    label: '县（区）',
    value: 'district',
  },
  {
    label: '详细地址',
    value: 'full_address',
  },
];

export const formTypeOptions = [
  {
    label: '单行文本',
    value: 'text',
    // regexp: ['email', 'number', 'float'],
  },
  {
    label: '多行文本',
    value: 'textarea',
  },
  {
    label: '下拉选择',
    value: 'select',
  },
  {
    label: '日期区间',
    value: 'date_range',
  },
  {
    label: '日期',
    value: 'date',
  },
  {
    label: '单选',
    value: 'radio',
  },
  {
    label: '多选',
    value: 'checkbox',
  },
  {
    label: '地址',
    value: 'address',
  },
];

export const selectTypeOption = [
  {
    label: '单选',
    value: 1,
  },
  {
    label: '多选',
    value: 2,
  },
];

const handleIgnoreOptions = (options: any[], ignoreFormType: any[]) => {
  return options.filter((item: any) => !ignoreFormType.includes(item.value));
};

const ProFormListAction = ({ disabled, index, action, count }: any) => {
  if (disabled) return null;
  return (
    <div style={{ width: 130 }}>
      <Button
        type="text"
        icon={<UpCircleOutlined />}
        disabled={index === 0}
        onClick={() => action.move?.(index, index - 1)}
      />
      <Button
        type="text"
        disabled={index === count - 1}
        icon={<DownCircleOutlined />}
        onClick={() => action.move?.(index, index + 1)}
      />
      <Button
        type="text"
        icon={<CopyOutlined />}
        onClick={() => action.add(action.getCurrentRowData())}
      />
      <Button
        type="text"
        icon={<DeleteOutlined />}
        onClick={() => action.remove?.(index)}
      />
    </div>
  )
};

const ProFormListItem = ({ form_type, disabled, index, action, count }: any) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const currentData = action.getCurrentRowData();
    if (currentData?.other?.show || currentData?.metadata?.tag_ids?.length || currentData?.metadata?.lookstar_score) {
      setOpen(true);
    };
  }, []);

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ display: 'flex', flex: 1, paddingBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <ConfigProvider
            theme={{
              token: {
                marginLG: 16,
              },
            }}
          >
            <ProFormText
              name="label"
              preserve={false}
              disabled={disabled}
              rules={[
                {
                  required: true,
                },
                {
                  validator: (rule, value, callback) => {
                    if (value && `${value}`.length > 18 && form_type == 'select') {
                      return Promise.reject(new Error('最多输入18个中文或英文!'));
                    };
                    return Promise.resolve();
                  },
                }
              ]}
            />
            {/* 因为有设置 preserve 参数，所以才把收起改为css控制 */}
            <div style={{ height: open ? 'auto' : 0, width: '100%', overflow: 'hidden' }}>
              <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ whiteSpace: 'nowrap', paddingTop: 4 }}>
                  允许填空：
                </div>
                <ProFormCheckbox
                  preserve={false}
                  name={['other', 'show']}
                  disabled={disabled}
                  getValueFromEvent={(e) => (e.target.checked ? 1 : 0)}
                />
              </div>

              <ProFormDependency name={['other', 'show']}>
                {(depValues) => {
                  if (depValues?.other?.show) return (
                    <div style={{ display: 'flex' }}>
                      <div style={{ whiteSpace: 'nowrap', paddingTop: 4 }}>
                        填空必填：
                      </div>
                      <ProFormCheckbox
                        preserve={false}
                        disabled={disabled}
                        name={['other', 'required']}
                        getValueFromEvent={(e) => (e.target.checked ? 1 : 0)}
                      />
                    </div>
                  );
                  return null;
                }}
              </ProFormDependency>
              <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ whiteSpace: 'nowrap', paddingTop: 4 }}>
                  设置标签：
                </div>
                <ProForm.Item name="tag_ids" style={{ width: '100%' }} rules={[]} initialValue={[]}>
                  <TreeSelectTag disabled={disabled} style={{ width: "100%" }} rules={[]} />
                </ProForm.Item>
              </div>
              <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ whiteSpace: 'nowrap', paddingTop: 4 }}>
                  设置积分：
                </div>
                <ProFormDigit
                  name="lookstar_score"
                  fieldProps={{ precision: 0 }}
                  disabled={disabled}
                  formItemProps={{
                    style: {
                      width: '100%',
                    }
                  }}
                />
              </div>
            </div>
          </ConfigProvider>
          <a onClick={() => setOpen(!open)}>{open ? "收起" : "展开"}</a>
        </div>
      </div>
      <ProFormListAction
        disabled={disabled}
        index={index}
        action={action}
        count={count}
      />
    </div>
  )
};

export default ({
  ignoreFormType = [],
  ignoreRuleName = [],
  disabled,
  hideShow,
  formTypeProps,
  hideRequired,
  showFieldProps,
  requiredFieldProps,
}: any) => {
  return (
    <>
      <ProFormRadio.Group
        disabled={disabled}
        {...formTypeProps}
        name="form_type"
        label="字段类型"
        initialValue="text"
        options={handleIgnoreOptions(formTypeOptions, ignoreFormType)}
        rules={[
          {
            required: true,
            message: '请选择字段类型',
          },
        ]}
      />

      <ProFormDependency name={['form_type']}>
        {({ form_type }) => {
          if (form_type === 'address') {
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
              />
            );
          }
          return null;
        }}
      </ProFormDependency>

      <ProFormText
        name="label"
        label="字段名称"
        rules={[
          {
            required: true,
            message: '请输入字段名称',
          },
        ]}
      />

      <ProFormDependency name={['form_type']}>
        {({ form_type }) => {
          if (!['checkbox', 'radio'].includes(form_type)) {
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

      {!hideShow ? (
        <ProFormSwitch
          preserve={false}
          initialValue={1}
          label="是否展示"
          name="show"
          fieldProps={{ checkedChildren: '展示', unCheckedChildren: '不展示' }}
          formItemProps={{ getValueFromEvent: (e) => (e ? 1 : 0) }}
          rules={[{ required: true }]}
          {...showFieldProps}
        />
      ) : null}

      {!hideRequired ? (
        <ProFormSwitch
          preserve={false}
          initialValue={1}
          label="是否必填"
          name="required"
          fieldProps={{ checkedChildren: '必填', unCheckedChildren: '非必填' }}
          formItemProps={{ getValueFromEvent: (e) => (e ? 1 : 0) }}
          rules={[{ required: true }]}
          {...requiredFieldProps}
        />
      ) : null}

      <ProFormDependency name={['form_type']}>
        {({ form_type }) => {
          if (['text'].includes(form_type)) {
            return (
              <div>
                <ProFormSelect
                  preserve={false}
                  name="rule_name"
                  label="验证方式"
                  disabled={disabled}
                  getValueFromEvent={(event) => event === undefined ? '' : event}
                  request={async () => {
                    const data = await queryRuleRule();

                    return data
                      .map((item: any) => ({
                        label: item.label,
                        value: item.name,
                      }))
                      .filter((item: any) => !ignoreRuleName.includes(item.value));
                  }}
                />

                <ProFormDependency name={['rule_name']}>
                  {({ rule_name }) => {
                    if (rule_name === 'regexp_email') {
                      return (
                        <ProFormList
                          name="options"
                          label="禁止提交的邮箱尾缀"
                          copyIconProps={false}
                          creatorButtonProps={!disabled}
                          deleteIconProps={!disabled}
                        >
                          {() => (
                            <Space key="label" align="start" size={0}>
                              <ProFormText
                                preserve={false}
                                width="md"
                                disabled={disabled}
                                fieldProps={{
                                  addonBefore: 'xxxxxxxxxxx@',
                                }}
                                rules={[
                                  {
                                    required: true,
                                  },
                                ]}
                                name="value"
                              />
                            </Space>
                          )}
                        </ProFormList>
                      );
                    }
                    return null;
                  }}
                </ProFormDependency>
              </div>
            );
          }
          return null;
        }}
      </ProFormDependency>

      <ProFormDependency name={['form_type']}>
        {({ form_type }) => {
          if (['checkbox', 'radio', 'select'].includes(form_type)) {
            return (
              <ProFormList
                required
                name="options"
                label="选项"
                creatorButtonProps={!disabled}
                copyIconProps={false}
                deleteIconProps={false}
                itemRender={({ listDom, action }, { index }) => (
                  <ProCard
                    bordered
                    style={{ marginBlockEnd: 8 }}
                    extra={action}
                    bodyStyle={{ paddingBlockEnd: 0 }}
                  >
                    {listDom}
                  </ProCard>
                )}
                rules={[
                  {
                    validator: async (_, value) => {
                      if (value && value.length > 0) {
                        return;
                      }
                      throw new Error('至少要有一项！');
                    },
                  },
                ]}
              >
                {(meta, index, action, count) => (
                  <ProFormListItem
                    form_type={form_type}
                    disabled={disabled}
                    index={index}
                    action={action}
                    count={count}
                  />
                )}
              </ProFormList>
            );
          }
          return null;
        }}
      </ProFormDependency>
    </>
  );
};
