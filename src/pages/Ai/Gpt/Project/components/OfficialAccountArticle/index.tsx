import { useEffect } from 'react';
import { useModel } from '@umijs/max';
import { Popconfirm, Badge } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from "@/components/BaseComponents";

import { queryRule } from '@/pages/workbench/operation/WeChat/Freepublish/service';

import Create from './Create';
import Delete from './Delete';
import Restore from './Restore';

import { addMeta, deleteMeta } from '@/utils/meta';
import formOptionToValueenum from '@/utils/formOptionToValueenum';

import { removeRepositoryDataFreepublishRule, getRepositoryDataRestoreFreepublishRule, getRepositoryDataFreepublishAllRule, getRepositoryDataRestoreAllFreepublishRule } from '../../../service';


export default ({ projectId }: any) => {
  const { initialState } = useModel('@@initialState');
  const authorizerList = initialState?.authorizer || [];

  const columns: ProColumns[] = [
    {
      title: '公众号',
      key: 'filter[appid]',
      dataIndex: 'appid',
      width: 300,
      valueEnum: formOptionToValueenum(authorizerList),
    },
    {
      dataIndex: 'thumb_url',
      title: '封面图',
      valueType: 'image',
      fieldProps: {
        width: 100,
      },
      width: 200,
      hideInSearch: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'filter[title]',
    },
    {
      title: '状态',
      width: 100,
      key: 'filter[state]',
      valueType: 'select',
      valueEnum: {
        1: '已同步',
        0: '已删除',
      },
      render: (dom: any, record: any) => {
        const badgeValue: any = record?.repository_data?.state
          ? {
            status: 'success',
            text: '已同步',
          }
          : {
            status: 'error',
            text: '已删除',
          };
        return <Badge {...badgeValue} />;
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      hideInSearch: true,
      valueType: 'option',
      width: 300,
      render: (dom: any, record: any, index, action: any) => {
        let btnDom = <Popconfirm
          key="delete"
          title="确定删除此项?"
          okText="确认"
          cancelText="取消"
          onConfirm={async () => {
            await removeRepositoryDataFreepublishRule(record?.repository_data?.id, {
              project_id: projectId,
            });
            action?.reload();
          }}
        >
          <a style={{ color: 'red' }}>
            删除
          </a>
        </Popconfirm>;
        if (!record?.repository_data?.state) {
          btnDom = <Popconfirm
            key="delete"
            title="确定恢复此项?"
            okText="确认"
            cancelText="取消"
            onConfirm={async () => {
              await getRepositoryDataRestoreFreepublishRule(record?.repository_data?.id, {
                project_id: projectId,
              });
              action?.reload();
            }}
          >
            <a>
              恢复
            </a>
          </Popconfirm>
        };

        return [
          <a
            key="url"
            target="_blank"
            href={record?.url}
          >
            查看
          </a>,
          btnDom,
        ];
      },
    },
  ];

  useEffect(() => {
    addMeta('referrer', 'referrer', 'no-referrer');

    return () => {
      deleteMeta('referrer');
    };
  }, []);

  return (
    <div style={{ minHeight: 520 }}>
      <ProTable
        rowKey="id"
        params={{
          'filter[project_id]': projectId,
          'filter[repository]': 1,
          'include': 'repositoryData',
        }}
        request={queryRule}
        toolBarRender={(action) => {
          return [
            // <Restore
            //   key="restore"
            //   onClick={async () => {
            //     await getRepositoryDataRestoreAllFreepublishRule(projectId);
            //     action?.reload();
            //     return true;
            //   }}
            // />,
            <Delete
              key="delete"
              title="删除所有文章"
              description="您是否确定删除所有文章?"
              onConfirm={async () => {
                await getRepositoryDataFreepublishAllRule(projectId);
                action?.reload();
                return true;
              }}
            />,
            <Create
              key="create"
              projectId={projectId}
              onReset={() => {
                action?.reload();
              }}
            />,
          ]
        }}
        // pagination={false}
        // search={false}
        columns={columns}
        toolbar={{
          className: "reset-pro-table-toolbar-padding0",
        }}
      />
    </div>
  );
};
