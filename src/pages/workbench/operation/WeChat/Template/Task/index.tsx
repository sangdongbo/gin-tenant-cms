import { useSearchParams, useParams, history } from '@umijs/max';
import { Popconfirm } from 'antd';
import { stringify, parse } from 'qs';
import { ProTable } from '@/components/BaseComponents';
import { CreateFiles, Create, Update, StartTask } from './components';
import { queryRule, removeRule, updateTaskStatusRule } from './service';
import { useEffect } from 'react';

export default () => {
  const params = useParams();
  const id = params.id;
  const [searchParams, setSearchParams] = useSearchParams();
  const openCreate: any = searchParams.get('openCreate');

  const columns: any[] = [
    {
      title: '任务名称',
      dataIndex: 'title',
      key: 'filter[title]',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'filter[status]',
      valueEnum: {
        3: {
          text: '已完成',
          status: 'Success',
        },
        2: {
          text: '进行中',
          status: 'Processing',
        },
        1: {
          text: '已启用',
          status: 'Warning',
        },
        0: {
          text: '未启用',
          status: 'Default',
        },
      },
    },
    {
      title: '创建时间',
      valueType: 'dateTime',
      dataIndex: 'created_at',
      width: 180,
      search: false,
    },
    {
      title: '模板发送时间',
      valueType: 'dateTime',
      dataIndex: 'send_time',
      width: 180,
      search: false,
    },
    {
      title: '预计发送',
      dataIndex: 'send_cnt',
      search: false,
    },
    {
      title: '成功',
      dataIndex: ['send_result', 'success_cnt'],
      search: false,
    },
    {
      title: '失败',
      dataIndex: ['send_result', 'fail_cnt'],
      search: false,
    },
    {
      title: '完成率',
      render: (_: any, record: any) => {
        if (record.status == 3) {
          let percentage = 100;
          if (record.openid_cnt) {
            percentage = Number(
              ((record?.send_result?.success_cnt / record?.openid_cnt) * 100).toFixed(2),
            );
          }
          return `${percentage}%`;
        }
        return '-';
      },
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'option',
      search: false,
      render: (_: any, record: any, index: number, action: any) => {
        let domArray: any[] = [];
        let TaskButton = (
          <StartTask
            key="startTask"
            record={record}
            onSubmit={() => {
              action.reload();
            }}
          >
            <a style={record.status == 1 ? { color: 'red' } : {}}>
              {record.status == 1 ? '关闭任务' : '启动任务'}
            </a>
          </StartTask>
        );

        let DownloadButton = record.openid_cnt ? (
          <a
            href={`${API_URL}/tenant/wechat/template/task/${
              record.id
            }/export?token=${localStorage.getItem(
              'lookstar-tenant-token',
            )}&tenant=${localStorage.getItem('lookstar-tenant-X-Tenant')}`}
          >
            下载人群
          </a>
        ) : null;

        if (record.status == 0) {
          domArray = [
            <Update
              key="update"
              id={record.id}
              initialValues={{
                title: record.title,
                type: record.type,
                send_time: record.send_time,
              }}
              onSubmit={() => {
                action.reload();
              }}
            />,
            <CreateFiles
              key="CreateFiles"
              params={{
                id: record.id,
              }}
              tableAction={action}
            >
              <a>上传人群</a>
            </CreateFiles>,
            DownloadButton,
            TaskButton,
            <Popconfirm
              title="确定删除此项?"
              onConfirm={async () => {
                await removeRule(record.id);
                action.reload();
              }}
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>,
          ];
        }
        if (record.status == 1) {
          domArray = [DownloadButton, TaskButton];
        }
        return [...domArray];
      },
    },
  ];

  useEffect(() => {
    const query = parse(window.location.search.replace('?', ''));
    delete query.openCreate;
    setSearchParams(`?${stringify(query)}`);
  }, []);

  return (
    <div>
      <ProTable
        headerTitle="任务管理"
        // search={false}
        params={{
          'filter[template_id]': id,
        }}
        request={queryRule}
        columns={columns}
        toolBarRender={(action) => [
          <Create
            key="template"
            id={id}
            defaultVisible={openCreate == 1}
            onSubmit={() => {
              action?.reload();
            }}
          />,
        ]}
      />
    </div>
  );
};
