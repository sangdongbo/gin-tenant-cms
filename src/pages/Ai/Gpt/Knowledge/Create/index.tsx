import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@/components/BaseComponents';
import getUrlName from '@/utils/getUrlName';
import { Button, message, Popconfirm } from 'antd';
import { queryRule, addRule, updateRule, deleteRule, getRule } from './service';
import { CreateForm, UpdateForm } from './components';

export default ({ projectId }: any) => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns[] = [
    {
      title: '资料名称',
      dataIndex: 'title',
      key: 'filter[title]',
      width: 300,
    },
    {
      title: '资料类型',
      dataIndex: 'type',
      width: 300,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      hideInSearch: true,
      valueType: 'option',
      render: (text, record, _, action) => [
        <UpdateForm
          title="编辑"
          onFinish={async (values: any) => {
            await updateRule(record.id, values);
            message.success('更新成功');
            actionRef?.current?.reload();
            return true;
          }}
          request={() => getRule(record.id)}
          key="edit"
        >
          <a>编辑</a>
        </UpdateForm>,
        <Popconfirm
          key="delete"
          title="删除数据"
          description="您确定要删除这行数据吗?"
          onConfirm={async () => {
            await deleteRule(record.id);
            message.success('删除成功');
            actionRef?.current?.reload();
          }}
        >
          <a style={{ color: 'red' }}>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <div style={{ minHeight: 520 }}>
      <ProTable
        actionRef={actionRef}
        params={{
          'filter[project_id]': projectId,
          'filter[source_type]': 'create',
        }}
        request={queryRule}
        toolBarRender={() => [
          <CreateForm
            title="新建资料"
            onFinish={async (values: any) => {
              values.project_id = projectId;
              await addRule(values);
              message.success('提交成功');
              actionRef?.current?.reload();
              return true;
            }}
            key="create"
          >
            <Button key="button" icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </CreateForm>,
        ]}
        columns={columns}
        toolbar={{
          className: 'reset-pro-table-toolbar-padding0',
        }}
      />
    </div>
  );
};
