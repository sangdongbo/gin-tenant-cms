import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DrawerForm } from '@ant-design/pro-components';
import { ProTable } from '@/components/BaseComponents';
import { queryCustomFileRule } from '../service';
import CreateFiles from './CreateFiles';

export default ({ children, audience, tableAction }: any) => {
  const columns: any = [
    {
      dataIndex: 'custom_name',
      title: '文件名称',
    },
    {
      dataIndex: 'size',
      title: '文件大小',
      render: (text, record, _, action) => <>{(text / 1000).toFixed(2)}KB</>,
    },
    {
      dataIndex: 'line_count',
      title: '总行数',
    },
    {
      dataIndex: 'user_count',
      title: '用户数',
    },
    {
      dataIndex: 'process_status',
      title: '状态',
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
    },
  ];
  return (
    <DrawerForm
      title={`人群 - ${audience?.custom_name}`}
      trigger={children}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      submitter={false}
      width={900}
      onOpenChange={async (visible: boolean) => {
        tableAction?.reload();
      }}
    >
      <ProTable
        size="small"
        columns={columns}
        search={false}
        rowKey="id"
        params={{ 'filter[audience_id]': audience?.audience_id }}
        request={async (params) => {
          const data = await queryCustomFileRule(params);
          return {
            data: data,
          };
        }}
        pagination={false}
        toolBarRender={(action) => [
          <CreateFiles key="add" tableAction={action} audienceId={audience?.audience_id}>
            <Button type="primary">
              <PlusOutlined /> 上传人群
            </Button>
          </CreateFiles>,
        ]}
      />
    </DrawerForm>
  );
};
