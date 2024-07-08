import { ProTable } from '@/components/BaseComponents';
import { Button, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CreateForm, Files } from './components';
import { queryCustomRule, removeCustomRule } from './service';

export default () => {
  const columns: any = [
    {
      dataIndex: 'custom_name',
      title: '标题',
    },
    {
      dataIndex: 'user_count',
      title: '总数量',
      width: 100,
    },
    {
      dataIndex: 'status',
      title: '状态',
      width: 100,
      valueEnum: {
        SUCCESS: {
          text: '可用',
          status: 'Success',
        },
        ERROR: {
          text: '错误',
          status: 'Error',
        },
        PROCESSING: {
          text: '处理中',
          status: 'Processing',
        },
        PENDING: {
          text: '待处理',
          status: 'Default',
        },
      },
    },
    {
      valueType: 'dateTime',
      dataIndex: 'created_at',
      title: '创建时间',
      width: 150,
    },
    {
      valueType: 'dateTime',
      dataIndex: 'updated_at',
      title: '更新时间',
      width: 150,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      render: (text, record, _, action) => [
        <Files key="files" audience={record} tableAction={action}>
          <a>人群文件</a>
        </Files>,
        <Popconfirm
          key="delete"
          title="确定删除此项?"
          okText="确认"
          cancelText="取消"
          onConfirm={async () => {
            await removeCustomRule(record.id);
            action?.reload();
          }}
        >
          <a href="#" style={{ color: 'red' }}>
            删除
          </a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ProTable
      search={false}
      pagination={false}
      columns={columns}
      rowKey="id"
      headerTitle="我的人群"
      toolBarRender={(action) => [
        <CreateForm key="add" tableAction={action}>
          <Button icon={<PlusOutlined />} type="primary">
            新建
          </Button>
        </CreateForm>,
      ]}
      request={queryCustomRule}
    />
  );
};
