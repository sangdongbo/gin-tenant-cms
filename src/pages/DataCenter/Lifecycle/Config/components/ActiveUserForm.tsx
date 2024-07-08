import ProFormGroup from '@/components/BaseComponents/ProFormGroup';
import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
  // ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Space } from 'antd';

export default () => {
  return (
    <ProFormGroup title="活跃用户" tooltip="指在系统中，满足以下行为的用户数量">
      <ProFormText
        name="name"
        label="阶段名称"
        rules={[
          {
            required: true,
          },
          {
            whitespace: true,
          },
        ]}
      />
      <div style={{ width: 362 }}>
        <ProFormList
          name="labels"
          label="条件设定"
          copyIconProps={false}
          creatorButtonProps={{
            creatorButtonText: '新建',
          }}
        >
          <Space>
            <ProFormSelect
              label="行为"
              options={[
                {
                  value: 'chapter',
                  label: '盖章后生效',
                },
              ]}
              width={230}
              name="useMode2"
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <ProFormDigit
              label="满足次数"
              name="value"
              width="sm"
              fieldProps={{
                formatter: (value) => `${value}`.replace('.', ''),
              }}
              rules={[
                {
                  required: true,
                },
                {
                  whitespace: true,
                },
              ]}
            />
          </Space>
        </ProFormList>
      </div>

      <ProFormRadio.Group
        label="规则设定"
        name="gz"
        radioType="button"
        initialValue="gz1"
        options={[
          {
            value: 'gz1',
            label: '规则方案一',
          },
          {
            value: 'gz2',
            label: '规则方案二',
          },
        ]}
        formItemProps={{
          style: {
            marginBottom: 10,
          },
        }}
        rules={[
          {
            required: true,
          },
        ]}
      />

      <ProForm.Item>
        <ProFormDependency name={['gz']}>
          {({ gz }) => {
            if (gz === 'gz1') {
              return (
                <Space>
                  以上条件中至少满足
                  <ProFormDigit
                    name="options-other1"
                    width="sm"
                    fieldProps={{
                      formatter: (value) => `${value}`.replace('.', ''),
                    }}
                    formItemProps={{
                      style: {
                        marginBottom: 0,
                      },
                    }}
                    rules={[
                      {
                        required: true,
                      },
                      {
                        whitespace: true,
                      },
                    ]}
                  />
                  个
                </Space>
              );
            }
            return (
              <Space>
                在满足
                <div>
                  <ProFormSelect
                    options={[
                      {
                        value: 'chapter1',
                        label: '盖章后生效',
                      },
                      {
                        value: 'chapter2',
                        label: '盖章后生效',
                      },
                    ]}
                    width={230}
                    name="options-other2"
                    formItemProps={{
                      style: {
                        marginBottom: 0,
                      },
                    }}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  />
                </div>
                的基础上，再满足
                <ProFormDigit
                  name="options-other3"
                  width="sm"
                  fieldProps={{
                    formatter: (value) => `${value}`.replace('.', ''),
                  }}
                  formItemProps={{
                    style: {
                      marginBottom: 0,
                    },
                  }}
                  rules={[
                    {
                      required: true,
                    },
                    {
                      whitespace: true,
                    },
                  ]}
                />
                个
              </Space>
            );
          }}
        </ProFormDependency>
      </ProForm.Item>
    </ProFormGroup>
  );
};
