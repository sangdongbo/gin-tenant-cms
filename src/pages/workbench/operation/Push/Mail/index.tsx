import { useRef } from 'react';
import { message } from 'antd';
import { history, Link } from '@umijs/max';
import { ProTable } from '@/components/BaseComponents';
import { MailConfig as TipsMailConfig } from '@/components/Tips';
import Create from './components/Create';
import Update from './components/Update';
import PreviewMail from './components/PreviewMail';
import UpdateHtml from './components/UpdateHtml';

import { queryRule } from './service';

export default () => {
  const actionRef = useRef<any>(null);

  const columns: any[] = [
    {
      title: '模版名称',
      dataIndex: 'title',
      search: false,
      width: 160,
    },
    {
      title: '邮件标题',
      dataIndex: 'subject',
      search: false,
      width: 160,
    },
    {
      title: '任务数',
      dataIndex: 'task_cnt',
      search: false,
      width: 72,
    },
    {
      title: '已完成',
      dataIndex: 'task_success_cnt',
      search: false,
      width: 72,
    },
    {
      title: '进行中',
      dataIndex: 'task_processing_cnt',
      search: false,
      width: 72,
    },
    {
      title: '创建时间',
      valueType: 'dateTime',
      dataIndex: 'created_at',
      search: false,
      width: 120,
    },
    {
      title: '最近一次发送时间',
      dataIndex: 'last_send_time',
      search: false,
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'option',
      search: false,
      width: 180,
      render: (_: any, record: any, index: number, action: any) => {
        let disabled = false;
        if (record?.type == 2) {
          disabled = !record?.body;
        }
        return [
          <Update
            key="Update"
            record={record}
            onSave={() => {
              action?.reload();
            }}
          />,
          <PreviewMail
            disabled={disabled}
            record={record}
            onDisabled={() => {
              message.info('请先编辑内容在发送');
            }}
          />,
          <>
            {record?.type == 1 ? (
              <UpdateHtml record={record} />
            ) : (
              <a
                key="content"
                onClick={() => {
                  history.push(`/workbench/operation/push/mail/content?id=${record.id}`);
                }}
              >
                编辑内容
              </a>
            )}
          </>,
          <Link to={`/workbench/operation/push/mail/task?id=${record.id}`} key="task">
            任务管理
          </Link>,
        ];
      },
    },
  ];

  return (
    <TipsMailConfig>
      <ProTable
        headerTitle="邮件推送管理"
        actionRef={actionRef}
        toolBarRender={(action) => [
          <Create
            key="template"
            onSave={() => {
              action?.reload();
            }}
          />,
        ]}
        search={false}
        request={queryRule}
        columns={columns}
      />
    </TipsMailConfig>
  );
};
