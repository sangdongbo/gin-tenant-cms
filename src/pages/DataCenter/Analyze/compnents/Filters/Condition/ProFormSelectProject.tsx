import React, { useEffect, useState } from 'react';
import { Select, Divider, Space, Button, message } from 'antd';
import type { SelectProps } from 'antd';
import { unionBy, differenceBy } from 'lodash';
import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';

interface CustomSelectProjectType extends SelectProps {
  params?: any;
  request?: any;
  maxSelect?: number;// 最多选择多少个
  onChange: any;
}

interface PropsType extends ProFormItemProps {
  fieldProps?: any;
  options?: any[];
  request?: any;
  maxSelect?: number;// 最多选择多少个
};

const handleOptions = (maxSelect: number, options: any[], value: any[]) => {
  if (Number(maxSelect) && value?.length >= maxSelect) {
    options = options.map(item => {
      if (!value.includes(item.value)) {
        return {
          ...item,
          disabled: true,
        }
      };
      return item;
    });
  };
  return options;
}

const CustomSelectProject = ({ params, maxSelect = 0, request, value: baseValue, onChange, ...props }: CustomSelectProjectType) => {
  const [options, setOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(baseValue);

  useEffect(() => {
    setValue(baseValue?.map((item: any) => item.value));
  }, [baseValue]);

  useEffect(() => {
    setLoading(true);
    request(params).then((res: any[]) => {
      setOptions(res);
      setLoading(false);
    });
  }, [params]);

  return (
    <div className="pro-field-md">
      <Select
        className="reset-select-scroll-x reset-select-height30"
        mode="multiple"
        {...props}
        loading={loading}
        options={handleOptions(maxSelect, options, value)}
        value={value}
        onChange={(value: any, option: any[]) => {
          onChange(option);
        }}
        dropdownRender={(menu: any) => {
          return (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <Space style={{ padding: '0 8px 4px' }}>
                <Button
                  type="primary"
                  disabled={baseValue?.length >= maxSelect}
                  onClick={() => {
                    let currentValue = unionBy(baseValue, options, 'value');
                    if (currentValue.length > maxSelect) {
                      const differenceValue = differenceBy(options, baseValue, 'value');
                      const residueLength = maxSelect - baseValue.length;
                      const newValue = differenceValue.splice(0, residueLength);
                      currentValue = [...baseValue, ...newValue];
                    };
                    onChange(currentValue);
                  }}
                >
                  选择全部
                </Button>
              </Space>
            </>
          )
        }}
      />
    </div>
  )
}

const ProFormSelectProject = ({ fieldProps, maxSelect, params, options, request, ...props }: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <CustomSelectProject maxSelect={maxSelect} options={options} params={params} request={request} {...fieldProps} />
    </ProForm.Item>
  );
};

export default ProFormSelectProject;
