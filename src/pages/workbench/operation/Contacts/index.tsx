import { useRef } from 'react';
import { Link, history } from '@umijs/max';
import { ProTable } from '@/components/BaseComponents';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import CreateMenu from './components/Create';

import Star from './Profile/Component/Star';

import { queryRule } from './service';

export default () => {
  const actionRef = useRef();

  const columns = [
    {
      title: '星标',
      dataIndex: 'star',
      key: 'filter[star]',
      valueType: "select",
      valueEnum: {
        0: '未标记',
        1: '已标记'
      },
      search: false,// 接口暂时没加筛选，等后续开发后在开启
      render: (dom: any, record: any) => {
        return <Star
          star={record?.star}
        />
      },
    },
    {
      title: '积分',
      dataIndex: 'lookstar_score',
      search: false,// 接口暂时没加筛选，等后续开发后在开启
    },
    {
      title: '姓名',
      dataIndex: 'full_name',
      key: 'filter[full_name]',
    },
    {
      title: '电话',
      dataIndex: ['mask_data', 'phone'],
      key: 'filter[phone]',
    },
    {
      title: '邮箱',
      dataIndex: ['mask_data', 'email'],
      key: 'filter[email]',
      render: (dom: any) => dom || '-',
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'filter[company]',
    },
    {
      title: '职务',
      dataIndex: 'job',
      search: false,
    },
    {
      title: '注册时间',
      valueType: 'dateTime',
      dataIndex: 'created_at',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'action',
      hideInSearch: true,
      valueType: 'option',
      render: (_: any, record: any) => {
        return <Link to={`/workbench/operation/contacts/profile/${record.id}`}>查看详情</Link>;
      },
    },
  ];

  return (
    <ProTable
      actionRef={actionRef}
      // search={false}
      columns={columns}
      rowKey="id"
      pagination={{
        pageSize: 10,
      }}
      headerTitle="联系人"
      request={queryRule}
      toolBarRender={() => [
        <Button
          key="export"
          icon={<DownloadOutlined />}
          onClick={() => {
            window.location.href = `${API_URL}/tenant/contacts/export?token=${localStorage.getItem(
              'lookstar-tenant-token',
            )}&tenant=${localStorage.getItem('lookstar-tenant-X-Tenant')}`;
          }}
        >
          导出
        </Button>,
        <CreateMenu
          key="create-user"
          onFinish={() => {
            actionRef.current?.reload();
          }}
        />,
        <Button
          key="field"
          type="primary"
          onClick={() => history.push('/workbench/operation/contacts/field')}
        >
          字段管理
        </Button>,
      ]}
    />
  );
};
