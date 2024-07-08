import { useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Space, Button } from 'antd';
import { querySelectRule } from '@/pages/workbench/operation/WeChat/Authorizer/service';

export default ({ postColumns, ...props }: any) => {
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: '公众号',
      dataIndex: 'appid',
      key: 'filter[appid]',
      valueType: 'select',
      width: 200,
      request: querySelectRule,
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
      dataIndex: 'title',
      key: 'filter[title]',
      title: '标题',
    },
  ];

  return (
    <>
      <ProTable
        search={true}
        params={{
          sort: '-create_time'
        }}
        toolbar={{
          title: <div style={{ whiteSpace: 'nowrap' }}>已发布内容</div>,
          subTitle: <>微刊只抓取公众号后台已发布内容，已发布内容不会推送，不占用群发次数，也不会展示在公众号主页中</>,
        }}
        {...props}
        rowKey="id"
        columns={postColumns ? postColumns?.(columns) : columns}
        options={false}
        pagination={{
          pageSize: 10,
        }}
        tableAlertOptionRender={({ selectedRowKeys, selectedRows, onCleanSelected }: any) => {
          return (
            <Space size={16}>
              <Button
                loading={loading}
                type="primary"
                onClick={async () => {
                  setLoading(true);
                  await props.onOk?.({ selectedRowKeys, selectedRows, onCleanSelected });
                  setLoading(false);
                }}
              >
                确定
              </Button>
            </Space>
          );
        }}
      />
    </>
  );
};
