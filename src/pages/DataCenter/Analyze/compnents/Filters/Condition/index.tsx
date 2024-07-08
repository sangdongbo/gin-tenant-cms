import React, { useRef } from 'react';
import { ConfigProvider, Divider, Space, Button } from 'antd';
import { ProForm, ProFormSelect, ProFormDependency } from '@ant-design/pro-components';
import type { ProFormProps } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { ProFormDateRangePicker } from '@/components/BaseComponents';
import { queryGetFolderSelectRule, querySelectRule } from '@/pages/workbench/application/Project/service';
import { descriptionValueEnum, stateValueEnum } from '@/pages/workbench/application/Project/components/ProList';
import ProFormSelectProject from './ProFormSelectProject';

interface PropsType extends ProFormProps {
}

export default (props: PropsType) => {
  const optionsRef = useRef<any>([]);

  return (
    <ConfigProvider
      theme={{
        token: {
          marginLG: 13
        },
      }}
    >
      <ProForm
        submitter={false}
        layout="horizontal"
        {...props}
      >
        <ProFormSelect
          width="md"
          colProps={{ md: 12, xl: 8 }}
          labelCol={{
            flex: "80px"
          }}
          name="folder_id"
          label="文件夹"
          getValueFromEvent={(event) => event ? event : ''}
          request={queryGetFolderSelectRule}
        />
        <ProFormSelect
          width="md"
          colProps={{ md: 12, xl: 8 }}
          labelCol={{
            flex: "80px"
          }}
          name="type"
          label="项目类型"
          valueEnum={descriptionValueEnum}
        />
        <ProFormSelect
          width="md"
          colProps={{ md: 12, xl: 8 }}
          labelCol={{
            flex: "80px"
          }}
          name="state"
          label="项目状态"
          valueEnum={stateValueEnum}
        />

        <ProFormDependency
          name={['folder_id', 'type', 'state', 'time']}
        >
          {({ folder_id, type, state }) => {
            const currentParams = {
              'filter[folder_id]': folder_id,
              'filter[type]': type,
              'filter[state]': state,
              sort: '-state,-created_at',
            };

            return (
              <ProFormSelectProject
                name="project_ids"
                label="项目选择"
                width="md"
                maxSelect={20}
                colProps={{ md: 12, xl: 8 }}
                labelCol={{
                  flex: "80px"
                }}
                params={currentParams}
                request={async (params: any) => {
                  const res = await querySelectRule(params);
                  optionsRef.current = res;
                  return res;
                }}
              />
            )
          }}
        </ProFormDependency>
        <ProFormDateRangePicker
          allowClear={false}
          width="md"
          colProps={{ md: 12, xl: 8 }}
          labelCol={{
            flex: "80px"
          }}
          name="time"
          label="时间维度"
          fieldProps={{
            separator: "至",
            disabledDate: (current: any) => {
              return (current && current > dayjs()) || (current && current <= dayjs('2022-08-01T00:00:00.000Z').subtract(1, 'day'));
            },
          }}
          rules={[
            {
              required: true,
            }
          ]}
        />
      </ProForm>
    </ConfigProvider >

  )
}
