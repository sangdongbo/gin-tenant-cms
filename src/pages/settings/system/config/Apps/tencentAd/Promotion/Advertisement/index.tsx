import React from "react";
import { history } from '@umijs/max';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import ProTable from '@/components/BaseComponents/ProTable';

const Advertisement = () => {
  const dataSource: any[] = [
    {
      title: '推广计划(应用推广-IOS)-2023-02-06 14:42',
      exposure: '-',
      hits: '-',
      rate: '-',
      averagePrice: '-',
      spend: '-',
    }
  ];

  const columns: ProColumns<{}>[] = [
    {
      title: '广告名称',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'exposure',
    },
    {
      title: '操作',
      dataIndex: 'hits',
    },

    {
      title: '出价',
      dataIndex: 'averagePrice',
    },
    {
      title: '曝光量',
      dataIndex: 'spend',
    },
    {
      title: '点击量',
      dataIndex: 'spend',
    },
    {
      title: '点击率',
      dataIndex: 'rate',
    },
    {
      title: '点击均价',
      dataIndex: 'rate',
    },
    {
      title: '花费',
      dataIndex: 'rate',
    }
  ];

  return (
    <ProTable
      toolBarRender={() => [
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            history.push('/tencent-ad/promotion/advertisement/create')
          }}
        >
          新建广告
        </Button>,
      ]}
      search={false}
      // request={(params) => queryTableListRule(params)}
      dataSource={dataSource}
      columns={columns}
    />
  )
}

export default Advertisement;
