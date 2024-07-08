import type { ProColumns } from '@ant-design/pro-components';
import ProTable from '@/components/BaseComponents/ProTable';

export default (props: any) => {
  const columns: ProColumns[] = [
    {
      title: '评价等级',
      dataIndex: 'score',
      search: false,
      width: 100,
    },
    {
      title: '评价内容',
      dataIndex: 'remark',
      ellipsis: true,
      search: false,
    },
    {
      title: '评价时间',
      key: 'showTime',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 200,
    },
    {
      title: '评价时间',
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
  ];

  return (
    <ProTable
      headerTitle="评价列表"
      columns={columns}
      {...props}
    />
  );
};
