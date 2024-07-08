import { useState, useRef } from 'react';
import ProTable from '@/components/BaseComponents/ProTable';
import { Typography } from 'antd';
import { ProFormRadio } from '@ant-design/pro-components';
import formOptionToValueenum from '@/utils/formOptionToValueenum';
import {
  formTypeOptions,
  systemFormType,
} from '@/pages/workbench/operation/Contacts/Field/components/Form';

import { queryRule } from '@/pages/workbench/operation/Contacts/Field/service';

export default () => {
  const actionRef = useRef<any>();
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState<any>(null);

  const columns = [
    {
      title: '字段名称',
      dataIndex: 'label',
    },
    {
      title: '字段类型',
      valueEnum: formOptionToValueenum([...formTypeOptions, ...systemFormType]),
      dataIndex: 'form_type',
    },
    {
      title: '字段提示语',
      dataIndex: 'placeholder',
    },
    {
      title: '字段验证',
      dataIndex: ['rule', 'label'],
    },
    {
      title: 'HubSpot字段',
      width: 200,
      dataIndex: 'option',
      render: (dom: any, record: any) => {
        if (record.type == 'system')
          return <Typography.Text type="secondary">系统字段，不可操作</Typography.Text>;

        return (
          <a
            key="edit"
            onClick={() => {
              setRow(record);
              setVisible(true);
            }}
          >
            编辑
          </a>
        );
      },
    },
  ];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        search={false}
        columns={columns}
        request={queryRule}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
        options={false}
        // toolBarRender={() => [
        //   <ProFormRadio.Group
        //     name="state"
        //     label="状态"
        //     options={[
        //       {
        //         label: '开启',
        //         value: 1,
        //       },
        //       {
        //         label: '关闭',
        //         value: 0,
        //       },
        //     ]}
        //   />,
        // ]}
      />
    </>
  );
};
