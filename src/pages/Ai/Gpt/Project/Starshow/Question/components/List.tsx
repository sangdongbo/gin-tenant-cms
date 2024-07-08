import type { ProColumns } from '@ant-design/pro-components';
import { UnorderedListOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { ChartsCard, ChartsTable } from '@/components/Dashboard';

export default ({ request, fieldProps, ...props }: any) => {
  const columns: ProColumns[] = [
    {
      title: '问题',
      dataIndex: 'message',
      ellipsis: true,
    },
    {
      title: '提问时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      width: 460,
    },
  ];

  return (
    <ChartsCard
      row={3}
      titleIocn={<UnorderedListOutlined />}
      title="问题列表"
      {...props}
      time={false}
      params={{
        ...props?.params,
        _time: [dayjs().subtract(7, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
      }}
      extra={{
        customForms: [
          {
            key: 'range-picker',
            type: 'range-picker',
            name: '_time',
            size: 'small',
            separator: '至',
            disabledDate: (current: any) => {
              return (
                (current && current > dayjs()) ||
                (current && current <= dayjs('2022-08-01T00:00:00.000Z').subtract(1, 'day'))
              );
            },
            onHandle(e: any[]) {
              return [e[0].format('YYYY-MM-DD'), e[1].format('YYYY-MM-DD')];
            },
            presets: [
              {
                label: '7天',
                value: [dayjs().subtract(7, 'day'), dayjs()],
              },
              {
                label: '30天',
                value: [dayjs().subtract(30, 'day'), dayjs()],
              },
              {
                label: '90天',
                value: [dayjs().subtract(90, 'day'), dayjs()],
              },
            ],
          },
        ],
      }}
    >
      <ChartsTable
        rowKey="id"
        className="reset-table-placeholder-344"
        request={({ _time, ...params }: any) => {
          return request({
            ...params,
            start_time: _time[0],
            end_time: _time[1],
          });
        }}
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
        {...fieldProps}
      />
    </ChartsCard>
  );
};
