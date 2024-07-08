import { useRef } from 'react';
import { useSearchParams, history } from '@umijs/max';
import type { ProColumns } from '@ant-design/pro-components';
import { DownloadOutlined } from '@ant-design/icons';
import { stringify } from 'qs';
import { Button } from 'antd';
import ProTable from '@/components/BaseComponents/ProTable';
import Update from './components/Update';

import {
  queryContactsRule,
  updateContactsRule,
} from '@/pages/workbench/application/Project/service';

export const formList = [
  {
    title: '姓名',
    dataIndex: ['data', 'name'],
  },
  {
    title: '手机',
    dataIndex: ['data', 'telephone'],
  },
  {
    title: '电话',
    dataIndex: ['data', 'work_tel'],
  },
  {
    title: '传真',
    dataIndex: ['data', 'fax'],
  },
  {
    title: '邮件',
    dataIndex: ['data', 'email'],
  },
  {
    title: '公司',
    dataIndex: ['data', 'company'],
  },
  {
    title: '部门',
    dataIndex: ['data', 'department'],
  },
  {
    title: '职称',
    dataIndex: ['data', 'title'],
  },
  {
    title: '地址',
    dataIndex: ['data', 'address'],
  },
  {
    title: '网址',
    dataIndex: ['data', 'url'],
  },
  {
    title: 'QQ',
    dataIndex: ['data', 'QQ'],
  },
  {
    title: '其他信息',
    dataIndex: ['data', 'other'],
  },
];

export default () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('id');
  const paramsRef = useRef<any>(null);

  const columns: ProColumns[] = [
    ...formList,
    {
      title: '识别时间',
      key: 'showTime',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 200,
    },
    {
      title: '识别时间',
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
      title: '操作',
      valueType: 'option',
      width: 116,
      render: (dom: any, record: any, _, action) => {
        return [
          <Update
            initialValues={record}
            formList={formList}
            onFinish={async (formValues) => {
              await updateContactsRule(record?.id, {
                project_id: projectId,
                ...formValues,
              });
              action?.reload();
              return true;
            }}
          />
        ];
      },
    },
  ];

  return (
    <ProTable
      // headerTitle="名片列表"
      columns={columns}
      params={{
        'filter[project_id]': projectId,
      }}
      request={(params) => {
        paramsRef.current = params;
        return queryContactsRule(params);
      }}
      headerTitle={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          名片列表
          <div
            style={{ marginLeft: 8, fontSize: 14, cursor: 'pointer', fontWeight: 'normal', whiteSpace: 'nowrap', color: '#0bc7ff' }}
            onClick={() => history.push(`/ai/gpt/project/starshow/data/business-card/email-config?id=${projectId}`)}
          >
            设置通知
          </div>
        </div>
      }
      toolBarRender={() => {
        return [
          <Button
            key="export"
            size="small"
            icon={<DownloadOutlined />}
            onClick={() => {
              let urlString: any = stringify({
                token: localStorage.getItem('lookstar-tenant-token'),
                tenant: localStorage.getItem('lookstar-tenant-X-Tenant'),
                ...(paramsRef?.current || {}),
              });
              window.location.href = `${API_URL}/tenant/project/contacts/star-show-export/${projectId}?${urlString}`;
            }}
          >
            导出
          </Button>
        ];
      }}
    />
  );
};
