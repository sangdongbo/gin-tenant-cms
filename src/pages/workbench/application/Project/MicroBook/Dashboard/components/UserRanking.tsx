import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';

export default ({ size = 'default', ...props }: any) => {
  const data = [
    {
      title: '资料一',
      count: '100',
    },
    {
      title: '资料二',
      count: '80',
    },
    {
      title: '资料三',
      count: '70',
    },
    {
      title: '资料四',
      count: '60',
    },
    {
      title: '资料五',
      count: '50',
    },
    {
      title: '资料六',
      count: '40',
    },
    {
      title: '资料七',
      count: '80',
    },
    {
      title: '资料八',
      count: '30',
    },
    {
      title: '资料九',
      count: '20',
    },
    {
      title: '资料十',
      count: '10',
    },
  ];
  const previewColumns: ProColumns<any>[] = [
    {
      title: '姓名',
      dataIndex: 'title',
      width: 200,
    },
    {
      title: '电话',
      dataIndex: 'count',
      width: 140,
    },
    {
      title: '公司',
      dataIndex: 'count',
    },
    {
      title: '邮箱',
      dataIndex: 'count',
      width: 240,
    },
    {
      title: '浏览次数',
      dataIndex: 'count',
      width: 140,
    },
  ];

  return (
    <ProCard headerBordered title="用户排名" subTitle="(TOP 10)" size={size} {...props}>
      <ProTable
        size={size}
        search={false}
        options={false}
        pagination={false}
        columns={previewColumns}
        dataSource={data}
        cardProps={{
          bodyStyle: { padding: 0 },
        }}
      />
    </ProCard>
  );
};
