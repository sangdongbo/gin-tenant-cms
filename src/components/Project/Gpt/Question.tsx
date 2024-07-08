import type { ProColumns } from '@ant-design/pro-components';
import ProTable from '@/components/BaseComponents/ProTable';

export default (props: any) => {
  const columns: ProColumns[] = [
    {
      title: '问题',
      dataIndex: 'message',
      ellipsis: true,
      search: false,
      width: 60,
    },
    {
      title: '答案',
      dataIndex: 'result',
      ellipsis: true,
      search: false,
      width: 180,
    },
    {
      title: '提问时间',
      key: 'showTime',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 60,
    },
    {
      title: '提问时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            start_time: value[0],
            end_time: value[1],
          };
        },
      },
    },
    {
      title: '问题反馈',
      dataIndex: 'feedbackString',
      ellipsis: true,
      search: false,
      width: 100,
    },
  ];

  return (
    <ProTable
      headerTitle="问题列表"
      columns={columns}
      {...props}
    />
  );
};
