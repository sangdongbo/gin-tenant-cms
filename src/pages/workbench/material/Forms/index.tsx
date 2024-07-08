import { Button, Popconfirm } from 'antd';
import { Link, history } from '@umijs/max';
import { ProTable } from '@/components/BaseComponents';
import { PlusOutlined } from '@ant-design/icons';
import Create from './components/Create';
import Quote from './components/Quote';

import { queryRule, addRule, updateRule, deleteRule, queryProjectRule } from './service';

export default () => {
  const columns: any[] = [
    {
      title: '表单名称',
      dataIndex: 'title',
      key: 'filter[title]',
      width: 250,
    },
    {
      title: '引用数量',
      width: 90,
      dataIndex: 'contacts_fields_count',
      render(dom: any, record: any) {
        return (
          <Quote
            title="引用项目"
            trigger={<a>{dom}</a>}
            request={(params: any) => queryProjectRule(record.id, params)}
          />
        );
      },
    },
    {
      title: '注册数量',
      width: 90,
      dataIndex: 'contacts_count',
      render: (dom: any, record: any) => (
        <Link key="user" to={`/workbench/material/forms/data/user?id=${record.id}`}>
          {dom}
        </Link>
      ),
    },
    {
      title: '创建时间',
      width: 180,
      valueType: 'dateTime',
      dataIndex: 'created_at',
    },
    {
      title: '修改时间',
      width: 180,
      valueType: 'dateTime',
      dataIndex: 'updated_at',
    },
    {
      title: '操作',
      width: 140,
      dataIndex: 'action',
      valueType: 'option',
      render: (_: any, record: any, index: number, action: any) => {
        return [
          <Link key="edit" to={`/workbench/material/forms/basic/edit?id=${record.id}`}>
            编辑
          </Link>,
          <Link key="user" to={`/workbench/material/forms/data/user?id=${record.id}`}>
            查看
          </Link>,
          // <Popconfirm
          //   key="delele"
          //   title="确定删除此项?"
          //   onConfirm={async () => {
          //     await deleteRule(record.id);
          //     action?.reload();
          //   }}
          // >
          //   <a style={{ color: 'red' }}>删除</a>
          // </Popconfirm>,
        ];
      },
    },
  ];

  return (
    <ProTable
      className="forms"
      search={false}
      columns={columns}
      rowKey="id"
      pagination={{
        pageSize: 10,
      }}
      params={{
        include: ['contacts', 'contactsFields'].join(','),
      }}
      headerTitle="表单库"
      request={queryRule}
      toolBarRender={(action) => [
        <Create
          key="create"
          title="新建表单库"
          trigger={
            <Button type="primary" icon={<PlusOutlined />}>
              新建
            </Button>
          }
          onFinish={async (formValue: any) => {
            const currentData = await addRule(formValue);
            // action?.reload();
            history.push(`/workbench/material/forms/basic/edit?id=${currentData.id}`);
            return true;
          }}
        />,
      ]}
    />
  );
};
