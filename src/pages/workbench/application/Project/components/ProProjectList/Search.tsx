import { Space } from 'antd';
import { ProCard, ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { stateValueEnum, descriptionValueEnum } from '../ProList';
import { useRef } from 'react';
import { Form } from 'antd';

export default (props: any) => {
  const formRef = useRef(Form.useForm()[0]);

  const handleReset = () => {
    props?.setParams({ sort: '-state,-created_at' });
  };

  return (
    <ProCard className="reset-pro-card shadow" bodyStyle={{ padding: 24 }}>
      <ProForm
        grid
        layout="horizontal"
        style={{
          padding: 0,
        }}
        rowProps={{
          gutter: [24, 24],
        }}
        submitter={{
          // 配置按钮文本
          searchConfig: {
            resetText: '重置',
            submitText: '查询',
          },
          onReset: handleReset,
          render: (props, doms) => {
            return <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>{doms}</Space>;
          },
        }}
        {...props}
      >
        <ProFormText
          colProps={{ md: 12, xl: 8 }}
          labelCol={{
            flex: '80px',
          }}
          name="title"
          label="项目名称"
        />
        <ProFormSelect
          colProps={{ md: 12, xl: 8 }}
          labelCol={{
            flex: '80px',
          }}
          name="state"
          label="项目状态"
          valueEnum={stateValueEnum}
          getValueFromEvent={(e) => {
            return e === undefined ? '' : e;
          }}
        />
        <ProFormSelect
          colProps={{ md: 12, xl: 8 }}
          labelCol={{
            flex: '80px',
          }}
          name="type"
          label="项目类型"
          valueEnum={descriptionValueEnum}
          getValueFromEvent={(e) => {
            return e === undefined ? '' : e;
          }}
        />
      </ProForm>
    </ProCard>
  );
};
