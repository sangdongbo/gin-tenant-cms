import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { Space, Popconfirm, Button, Select } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormDependency,
  ProFormList,
  ProFormSelect,
} from '@ant-design/pro-components';
import type { FormListActionType } from '@ant-design/pro-components';
import { DeleteOutlined } from '@ant-design/icons';
import { useUpdateEffect } from 'ahooks';
import TreeSelectTag from '@/pages/workbench/operation/Tag/Components/TreeSelectTag';

import './style.less';

const handelLifecycleOptions = (list: any[]) => {
  return list.map(item => ({
    label: item.title,
    value: item.type,
  }))
};

// 因为生命周期类型默认值应为 “in” 所以需要自定义Select 并触发onChange 到form 中
const BaseSelect = ({ actionRef, ...props }: any) => {
  const onChange = (value: any) => {
    props?.onChange?.(value);
  };

  useImperativeHandle(actionRef, () => ({
    onChange,
  }));

  return (
    <Select
      {...props}
      onChange={onChange}
    />
  )
};

const ProFilter = ({ formItemProps, fieldProps, type, options, ...props }: any) => {
  const actionRef = useRef<any>();
  useEffect(() => {
    if (type == 'lifecycle') {
      actionRef.current?.onChange('in');
    };
  }, [type]);

  return (
    <ProForm.Item
      {...props}
      {...formItemProps}
    >
      <BaseSelect actionRef={actionRef} options={options} {...fieldProps} />
    </ProForm.Item>
  );
};


const ProLifecycleValue = ({ actionRef, type, fieldProps, width, mode, options, formItemProps, ...props }: any) => {
  return (
    <ProForm.Item
      {...props}
      {...formItemProps}
    >
      <BaseSelect style={{ width }} actionRef={actionRef} mode={mode} options={options} {...fieldProps} />
    </ProForm.Item>
  )
};

const ProTagValue = ({ actionRef, type, fieldProps, width, mode, options, formItemProps, ...props }: any) => {
  return (
    <ProForm.Item
      {...props}
      {...formItemProps}
    >
      <TreeSelectTag actionRef={actionRef} width="100%" />
    </ProForm.Item>
  )
};

const DynamicForm = ({ type, filter }: any) => {
  const { declarationPeriodFieldMapping } = useModel(
    'declarationPeriod',
    (model) => model,
  );

  const actionRef = useRef<any>();

  useUpdateEffect(() => {
    actionRef.current?.onChange([]);
  }, [type, filter]);

  return (
    <>
      {
        type == 'lifecycle' ? (
          <Space size={24} align="center">
            处于
            <ProLifecycleValue
              actionRef={actionRef}
              width={300}
              name="value"
              mode="multiple"
              options={handelLifecycleOptions(declarationPeriodFieldMapping)}
              formItemProps={{
                style: {
                  marginBottom: 0,
                },
              }}
              rules={[{ required: true }]}
              help={false}
            />
            阶段
          </Space>
        ) : null
      }
      {
        type == 'tag' ? (
          <ProFormDependency name={['filter']}>
            {({ filter }) => {
              if (filter == 'in' || filter == 'not_in') {
                return (
                  <Space size={24} align="center">
                    <ProTagValue
                      actionRef={actionRef}
                      name="value"
                      rules={[{
                        required: true,
                        message: '请选择标签'
                      }]}
                      initialValue={[]}
                      style={{
                        width: 300,
                        marginBottom: 0,
                      }}
                      help={false}
                    />
                    {/* {filter == 'select_tag' ? (
                        <>
                          <div style={{ height: 32, lineHeight: '32px' }}>达到</div>
                          <ProFormDigit
                            name="tag_ids_num"
                            width={100}
                            formItemProps={{
                              style: {
                                marginBottom: 0,
                              },
                            }}
                            fieldProps={{
                              formatter: (value) => `${value}`.replace('.', ''),
                            }}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          />
                          <div style={{ height: 32, lineHeight: '32px' }}>次</div>
                        </>
                      ) : null} */}
                  </Space>
                );
              }
              return null;
            }}
          </ProFormDependency>
        ) : null
      }
    </>
  )
};

export default ({ disabled }: any) => {
  const actionRef = useRef<
    FormListActionType<any>
  >();
  const [currentListCount, setCurrentListCount] = useState(0);

  return (
    <>
      <ProFormList
        actionRef={actionRef}
        name="filter"
        initialValue={[{}]}
        copyIconProps={false}
        deleteIconProps={false}
        creatorButtonProps={false}
        style={{
          marginBottom: 0
        }}
        max={10}
      >
        {(meta: any, index: number, action: any, count: number) => {
          if (index + 1 == count) {
            setCurrentListCount(count)
          };
          return (
            <div key={index}>
              <div style={index == 0 ? {} : { padding: '8px 0' }}>
                <ProFormSelect
                  hidden={index == 0}
                  required
                  // className="reset-form-select"
                  width={70}
                  name="conditions"
                  options={[
                    {
                      label: '并且',
                      value: 'AND',
                    },
                    {
                      label: '或者',
                      value: 'OR',
                    },
                    // {
                    //   label: '非',
                    //   value: 'wrong',
                    // },
                  ]}
                  initialValue="AND"
                  fieldProps={{
                    allowClear: false,
                  }}
                  formItemProps={{
                    style: {
                      marginBottom: 0,
                    },
                  }}
                />
              </div>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  padding: '8px 0 8px 8px',
                  backgroundColor: '#fff'
                }}
              >
                <Space size={24} align="center">
                  <ProFormSelect
                    name="type"
                    options={[
                      {
                        label: '标签条件',
                        value: 'tag',
                      },
                      // {
                      //   label: '行为条件',
                      //   value: 'action',
                      // },
                      {
                        label: '生命周期',
                        value: 'lifecycle',
                      },
                    ]}
                    initialValue="tag"
                    formItemProps={{
                      style: {
                        marginBottom: 0,
                      },
                    }}
                    fieldProps={{
                      allowClear: false,
                    }}
                    rules={[{ required: true }]}
                  />

                  <ProFormDependency name={['type']}>
                    {({ type }) => {

                      return (
                        <>
                          <Space size={24} align="center" wrap={true} style={{ marginLeft: type == 'lifecycle' ? -24 : 0 }}>
                            {/* type 为 lifecycle 时 filter 默认为 in */}
                            <ProFilter
                              hidden={type == 'lifecycle'}
                              type={type}
                              name="filter"
                              options={[
                                {
                                  label: '沾染任一标签',
                                  value: 'any',
                                },
                                {
                                  label: '不沾染任何标签',
                                  value: 'not',
                                },
                                {
                                  label: '沾染选择的全部标签',
                                  value: 'in',
                                },
                                {
                                  label: '不沾染选择的任何标签',
                                  value: 'not_in',
                                },
                              ]}
                              formItemProps={{
                                style: {
                                  width: 182,
                                  marginBottom: 0,
                                },
                              }}
                              rules={[{
                                required: true,
                              }]}
                              initialValue="any"
                            />
                            <ProFormDependency name={['filter']}>
                              {({ filter }) => {
                                return <DynamicForm filter={filter} type={type} />
                              }}
                            </ProFormDependency>


                          </Space>
                        </>
                      );
                    }}
                  </ProFormDependency>
                </Space>

                {count > 1 && !disabled ? (
                  <div
                    style={{
                      position: 'absolute',
                      right: 24,
                      top: '50%',
                      zIndex: 4,
                      width: 22,
                      height: 22,
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <Popconfirm
                      key="delete"
                      title="确定要删除吗?"
                      onConfirm={async () => action.remove(index)}
                    >
                      <DeleteOutlined
                        style={{
                          fontSize: 18,
                        }}
                      />
                    </Popconfirm>
                  </div>
                ) : null}
              </div>
            </div>
          )
        }}
      </ProFormList>
      {
        currentListCount < 10 && !disabled ? (
          <Button
            style={{ marginTop: 8 }}
            type="link"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              actionRef?.current?.add({});
            }}
          >
            新建
          </Button>
        ) : null
      }
    </>
  )
};
