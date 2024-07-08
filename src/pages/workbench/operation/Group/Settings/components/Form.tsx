import { Popconfirm } from 'antd';
import {
  ProForm,
  ProFormList,
  ProFormSelect,
} from '@ant-design/pro-components';
import { DeleteOutlined } from '@ant-design/icons';
import BaseCard from './BaseCard';
import ConditionForm from './ConditionForm';

import './style.less';

export default ({ disabled, ...props }: any) => {
  return (
    <BaseCard
      title="筛选条件设置"
      style={{ paddingTop: 24 }}
    >
      <ProForm
        className="reset-form-list"
        disabled={disabled}
        {...props}
      >
        <ProFormList
          name="filter"
          copyIconProps={false}
          deleteIconProps={false}
          creatorButtonProps={disabled ? false : {
            creatorButtonText: '新建分组',
          }}
          initialValue={[
            {
              conditions: "AND",
              filter: [
                {
                  conditions: "AND",
                }
              ]
            }
          ]}
          rules={[
            {
              validator(rule, value) {
                if (value && value.length) {
                  return Promise.resolve();
                };
                return Promise.reject(new Error('请新建分组'));
              },
            }
          ]}
          max={10}
        >
          {(meta: any, index: number, action: any, count: number) => {
            return (
              <div key={index}>
                {/* {index != 0 ? (
                ): null} */}
                <ProFormSelect
                  hidden={index == 0}
                  className="reset-form-select"
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
                <div
                  style={{
                    position: 'relative',
                    width: "calc(100% - 34px)",
                    backgroundColor: '#f5f6fa',
                    margin: '16px 0',
                    padding: '24px 46px 24px 24px',
                    borderRadius: '5px',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 4,
                      height: 'calc(100% - 48px)',
                      backgroundColor: '#0bc7ff',
                    }}
                  />
                  <ConditionForm disabled={disabled} />
                  {count > 1 && !disabled ? (
                    <div
                      style={{
                        position: 'absolute',
                        right: -34,
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
            );
          }}
        </ProFormList>
      </ProForm>
    </BaseCard>
  );
};
