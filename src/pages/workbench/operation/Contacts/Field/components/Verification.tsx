import ProTable from '@/components/BaseComponents/ProTable';
import { queryRuleRule } from '../service';

export default () => {
  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      width: 100,
      render: (dom: any, record: any, index: number) => index + 1,
    },
    {
      title: '验证名称',
      dataIndex: 'label',
    },
    {
      title: '说明',
      dataIndex: 'description',
    },
    // {
    //   title: '操作',
    //   width: 200,
    //   dataIndex: 'option',
    //   render: (dom: any, record: any) => {
    //     if (record.id == 3) {
    //       return <a
    //         key="edit"
    //         onClick={() => {
    //           history.push('/workbench/operation/contacts/email-config');
    //         }}
    //       >
    //         编辑邮件模板
    //       </a>
    //     };
    //     return null;
    //   }
    // },
  ];

  return (
    <ProTable
      request={async () => {
        const data = await queryRuleRule();
        return {
          data,
        };
      }}
      search={false}
      columns={columns}
      rowKey="id"
      pagination={false}
      options={false}
      style={{ paddingTop: 24 }}
    />
  );
};
