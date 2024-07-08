import { useParams, Link } from '@umijs/max';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import ProTable from '@/components/BaseComponents/ProTable';
import { stringify } from 'qs';

import { queryUserInfoRule } from '../service';

export default () => {
  const params = useParams();
  const { type, id } = params;

  const columns = [
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
      rowKey="id"
      columns={columns}
      pagination={{
        pageSize: 10,
      }}
      params={{
        'filter[group.group_id]': id,
      }}
      headerTitle="联系人"
      request={queryUserInfoRule}
      toolBarRender={() => [
        <Button
          key="export"
          icon={<DownloadOutlined />}
          onClick={() => {
            let urlString: any = {
              token: localStorage.getItem('lookstar-tenant-token'),
              tenant: localStorage.getItem('lookstar-tenant-X-Tenant'),
              'filter[group.group_id]': id,
            };
            window.location.href = `${API_URL}/tenant/group/user-info/export?${stringify(urlString)}`;
          }}
        >
          导出
        </Button>,
      ]}
    />
  );
};
