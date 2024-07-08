import { useRef } from 'react';
import { Link, history } from '@umijs/max';
import { Popconfirm } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import ProTable from '@/components/BaseComponents/ProTable';
import Create from './components/Create';
import formOptionToValueenum from '@/utils/formOptionToValueenum';

import { queryRule, updateTotalRule, removeRule } from './service';

import { typeOptions } from './components/FormContent';

export default ({}: any) => {
  const actionRef = useRef();

  const columns: ProColumns<any>[] = [
    // {
    //   title: '序号',
    //   render: (_: any, record: any, index: number) => (index + 1),
    // },
    {
      title: '分组名称',
      dataIndex: 'title',
      width: 200,
    },
    {
      title: '分组类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: formOptionToValueenum(typeOptions),
      width: 90,
    },
    {
      title: '模板消息可触达数量',
      width: 145,
      dataIndex: ['total', 'wechat_cnt'],
      render: (_: any, record: any) => {
        let wechat_cnt: any = '-';

        if (record?.total?.wechat_cnt) {
          wechat_cnt = 0;
          const newData = JSON.parse(record?.total?.wechat_cnt);
          newData.forEach((item: any) => {
            wechat_cnt = wechat_cnt + Number(item.openid_cnt);
          });
        }

        return <div>{wechat_cnt}</div>;
      },
    },
    {
      title: '短信可触达数量',
      width: 120,
      dataIndex: ['total', 'mobile_cnt'],
    },
    {
      title: '邮件可触达数量',
      width: 120,
      dataIndex: ['total', 'email_cnt'],
    },
    {
      title: '注册时间',
      valueType: 'dateTime',
      dataIndex: 'created_at',
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'action',
      hideInSearch: true,
      width: 180,
      valueType: 'option',
      render: (_: any, record: any, index: number, action: any) => {
        return [
          <Link key="details" to={`/workbench/operation/group/settings/${record.id}`}>
            查看详情
          </Link>,
          <Link key="details" to={`/workbench/operation/group/contacts/mobile/${record.id}`}>
            查看分组联系人
          </Link>,
          <a
            onClick={async () => {
              await updateTotalRule(record.id);
              action.reload();
            }}
          >
            刷新数据
          </a>,
          // <Link key="details" to={`/workbench/operation/wechat/template/${record.id}`}>
          //   模版消息触达
          // </Link>,
          <Popconfirm
            title="确定删除此项?"
            onConfirm={async () => {
              await removeRule(record.id);
              action.reload();
            }}
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>,
        ];
      },
    },
  ];

  return (
    <ProTable
      actionRef={actionRef}
      search={false}
      columns={columns}
      rowKey="id"
      pagination={{
        pageSize: 10,
      }}
      headerTitle="分组管理"
      request={queryRule}
      toolBarRender={() => [
        <Create
          key="field"
          onFinish={(value: any) => {
            history.push(`/workbench/operation/group/settings/${value.id}`);
          }}
        />,
      ]}
    />
  );
};
