import { useRef } from 'react';
import { Link } from '@umijs/max';
import { ProTable } from '@/components/BaseComponents';
import Create from './components/Create';
import PreviewQrcode from './components/PreviewQrcode';
import Update from './components/Update';

import { querySelectRule } from '@/pages/workbench/operation/WeChat/Authorizer/service';
import { queryTemplateRule } from './service';

export default ({}: any) => {
  const actionRef = useRef<any>(null);

  const columns: any[] = [
    {
      title: '公众号',
      dataIndex: ['authorizer', 'nick_name'],
      key: 'filter[appid]',
      valueType: 'select',
      width: 100,
      request: querySelectRule,
    },
    {
      title: '消息名称',
      dataIndex: 'title',
      search: false,
      width: 150,
    },
    {
      title: '任务数',
      dataIndex: 'task_cnt',
      search: false,
      width: 50,
    },
    {
      title: '已完成',
      dataIndex: 'task_success_cnt',
      search: false,
      width: 50,
    },
    {
      title: '进行中',
      dataIndex: 'task_processing_cnt',
      search: false,
      width: 50,
    },
    {
      title: '创建时间',
      valueType: 'dateTime',
      dataIndex: 'created_at',
      search: false,
      width: 160,
    },
    {
      title: '最近一次发送时间',
      dataIndex: 'last_send_time',
      search: false,
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'option',
      search: false,
      width: 120,
      render: (_: any, record: any, index: number, action: any) => {
        return [
          <Update
            key="Update"
            record={record}
            onSave={() => {
              action?.reload();
            }}
          />,
          <PreviewQrcode key="PreviewQrcode" record={record} />,
          <Link to={`/workbench/operation/wechat/template/task/${record.id}`} key="task">
            任务管理
          </Link>,
        ];
      },
    },
  ];

  return (
    <ProTable
      headerTitle="模板消息管理"
      actionRef={actionRef}
      toolBarRender={(action) => [
        <Create
          key="template"
          onSave={() => {
            action?.reload();
          }}
        />,
      ]}
      params={{
        'filter[type]': 'wechat',
      }}
      request={queryTemplateRule}
      columns={columns}
    />
  );
};
