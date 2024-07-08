import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';
import React from 'react';

export default ({ columns, ...props }: any) => {
  const tableColumns: ProColumns<any>[] = [
    {
      title: '姓名',
      dataIndex: 'title',
    },
    {
      title: '电话',
      dataIndex: 'count',
      width: 140,
    },
    {
      title: '公司',
      dataIndex: 'count',
      width: 180,
    },
    {
      title: '邮箱',
      dataIndex: 'count',
      width: 180,
    },
    {
      title: '预览次数',
      dataIndex: 'count',
      width: 80,
    },
  ];

  return (
    <ProCard
      headerBordered
      split="horizontal"
      tabs={{
        size: props.size || 'default',
        tabPosition: 'left',
      }}
      {...props}
    >
      {columns.map(
        (
          { request, title, params = {}, chartsProps, tabKey, tabParmasKey, key, ...item }: any,
          index: number,
        ) => {
          const columnsParmas: any = {};
          columnsParmas[tabParmasKey ? tabParmasKey : 'filter[tab]'] = tabKey;

          return (
            <React.Fragment key={index}>
              <ProCard.TabPane tab={title} {...item} key={tabKey}>
                <ProTable
                  params={{
                    ...columnsParmas,
                    ...params,
                  }}
                  size={props.size || 'default'}
                  search={false}
                  options={false}
                  pagination={false}
                  columns={tableColumns}
                  cardProps={{
                    bodyStyle: {
                      padding: 0,
                    },
                  }}
                  tableStyle={{
                    height: 400,
                  }}
                  request={request}
                />
              </ProCard.TabPane>
            </React.Fragment>
          );
        },
      )}

      {/* <ProCard.TabPane key="preview" tab="预览">
        <ProTable
          size={props.size || 'default'}
          search={false}
          options={false}
          pagination={false}
          columns={tableColumns}
          dataSource={data}
          cardProps={{
            bodyStyle: { padding: 0 },
          }}
        />
      </ProCard.TabPane> */}
    </ProCard>
  );
};
