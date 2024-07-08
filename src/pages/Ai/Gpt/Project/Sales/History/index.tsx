import { useModel, useSearchParams } from '@umijs/max';
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@/components/BaseComponents';
import formOptionToValueenum from '@/utils/formOptionToValueenum';

import { queryRule } from './service';

export default () => {
  const { initialState } = useModel('@@initialState');
  const authorizerList = initialState?.authorizer || [];

  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  const columns: ProColumns[] = [
    {
      title: '公众号',
      dataIndex: ['wechat', 'appid'],
      valueEnum: formOptionToValueenum(authorizerList),
      width: 250,
    },
    {
      title: 'openid',
      dataIndex: 'openid',
      width: 300,
    },
    // {
    //   title: '昵称',
    //   dataIndex: ['wechat', 'nickname'],
    // },
    {
      title: '问题',
      dataIndex: 'message',
    },
    {
      title: 'AI 回复',
      dataIndex: 'result',
    },
    {
      title: '发送时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      width: 250,
    },
  ];


  return (
    <div className="history">
      <ProTable
        rowKey="id"
        columns={columns}
        search={false}
        params={{
          'filter[project_id]': projectId,
          'filter[type]': 'sales_gpt',
          include: 'wechat',
        }}
        request={queryRule}
        toolBarRender={() => [
          <Button
            key="export"
            icon={<DownloadOutlined />}
            onClick={() => {
              // /tenant/ai/gpt/conversation/sale-export?filter[project_id]=60&filter[type]=sales_gpt&include=wechat,wechat.authorizer&filter[openid]=
              window.location.href = `${API_URL}/tenant/ai/gpt/conversation/sale-export?filter[project_id]=${projectId}&include=wechat,wechat.authorizer&token=${localStorage.getItem(
                'lookstar-tenant-token',
              )}&tenant=${localStorage.getItem('lookstar-tenant-X-Tenant')}`;
            }}
          >
            导出
          </Button>,
        ]}
      />
    </div>
  )
}
