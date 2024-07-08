// import ProTable from "@/components/BaseComponents/ProTable";
import { ProTable } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';

export default () => {
  const columns = [
    {
      title: '头像',
      dataIndex: 'label',
    },
    {
      title: '昵称',
      dataIndex: 'form_type',
    },
  ];

  return (
    <ProCard bordered={false} style={{ marginBottom: 24 }} title="微信信息">
      <ProTable
        search={false}
        options={false}
        toolBarRender={false}
        pagination={false}
        columns={columns}
      />
    </ProCard>
  )
};
