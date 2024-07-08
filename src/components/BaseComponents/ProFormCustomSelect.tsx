import React, { useRef, useState, useEffect } from "react";
import { Radio, Space, Typography } from 'antd';
import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProForm, BetaSchemaForm } from '@ant-design/pro-components';
import { useUpdateEffect } from 'ahooks';
import classnames from "classnames";
import style from './style.less';

const { Text } = Typography;

interface OptionsType {
  label: any;
  value?: any
  fieldFormProps?: any;
}

interface PropsType extends ProFormItemProps {
  options: OptionsType[];
}

const CustomBudget = ({ options, value, onChange }: any) => {
  const [currentIndex, setCurrentIndex] = useState(null);

  const formRef = useRef<any>(null);

  // const reset = () => {
  //   setCurrentIndex(null);
  //   onChange('');
  // };

  const handelOnChange = () => {
    if (currentIndex == null) {
      onChange('')
      return;
    };

    const rowData = options[currentIndex];
    if (!rowData.valueType) {
      onChange(rowData.value);
    };
  };

  useUpdateEffect(() => {
    handelOnChange();
  }, [currentIndex]);

  return (
    <Space size={[10, 10]} direction="vertical">
      <div>
        <Radio.Group
          onChange={(event) => {
            if (formRef.current) {
              formRef.current.resetFields();
            };
            setCurrentIndex(event.target.value);
          }}
        >
          {
            options.map((item: any, index: number) => {
              return (
                <Radio.Button {...item} key={index} value={index}>{item.label}</Radio.Button>
              )
            })
          }
        </Radio.Group>
      </div>
      {
        currentIndex != null && options[currentIndex]?.fieldFormProps ? (
          <div >
            <div className={classnames({
              [style["custom-budget-group"]]: options[currentIndex]?.fieldFormProps.styleType == 'group'
            })}>
              {
                options[currentIndex]?.fieldFormProps?.render ? (
                  options[currentIndex]?.fieldFormProps?.render({ row: options[currentIndex], value, onChange })
                ) : (
                  <BetaSchemaForm
                    formRef={formRef}
                    submitter={false}
                    layoutType="Form"
                    onValuesChange={(schemaFormValue: any) => onChange?.(schemaFormValue.schema)}
                    columns={[
                      {
                        ...options[currentIndex]?.fieldFormProps,
                        dataIndex: "schema",
                        formItemProps: {
                          noStyle: true,
                          ...options[currentIndex]?.fieldFormProps?.formItemProps
                        },
                      }
                    ]}
                  />
                )
              }
            </div>
            {
              options[currentIndex]?.fieldFormProps?.desc ? (
                <Text type="secondary">{options[currentIndex]?.fieldFormProps?.desc}</Text>
              ) : null
            }
          </div>
        ) : null
      }
    </Space>
  );
};

const ProFormBudget = (props: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <CustomBudget {...props} />
    </ProForm.Item>
  );
};

export default ProFormBudget;
