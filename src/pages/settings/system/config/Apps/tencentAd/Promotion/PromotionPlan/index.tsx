import React from "react";
import { history } from '@umijs/max';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import ProTable from '@/components/BaseComponents/ProTable';

const PromotionPlan = () => {
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
      title: '推广计划名称',
      dataIndex: 'title',
    },
    {
      title: '曝光量',
      dataIndex: 'exposure',
    },
    {
      title: '点击量',
      dataIndex: 'hits',
    },
    {
      title: '点击率',
      dataIndex: 'rate',
    },
    {
      title: '点击均价',
      dataIndex: 'averagePrice',
    },
    {
      title: '花费',
      dataIndex: 'spend',
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'option',
      render: (_, record: any) => [
        <a
          onClick={() => {
            // handleCategoryId(record.id);
            // handleTagVisible(true);
          }}
        >
          编辑
        </a>,
        <a
          onClick={() => {
            // handleCategoryId(record.id);
            // handleTagVisible(true);
          }}
        >
          查看数据
        </a>,
        <a
          onClick={() => {
            // handleCategoryId(record.id);
            // handleTagVisible(true);
          }}
        >
          操作记录
        </a>,
      ],
    },
  ];

  return (
    <ProTable
      toolBarRender={() => [
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            history.push('/tencent-ad/promotion/promotion-plan/create')
          }}
        >
          新建
        </Button>,
      ]}
      search={false}
      // request={(params) => queryTableListRule(params)}
      dataSource={dataSource}
      columns={columns}
    />
  )
}

export default PromotionPlan;
