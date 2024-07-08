import { useState, useRef, useEffect } from 'react';
import { Popconfirm, Space } from 'antd';
import { DragSortTable } from '@ant-design/pro-components';
import { useModel, Link } from '@umijs/max';

import formOptionToValueenum from '@/utils/formOptionToValueenum';

import { eventTypeOptions } from '../Details/BaseForm';

import {
  queryAllRule,
  removeRule,
} from '../../service';

const getIdsRule: any = () => { };

export default ({ id, freepublishIds, toolBarRender = () => [], ...props }: any) => {
  const { eventList: dataSource, updaterEventList } = useModel('event', (model) => model);

  const [loading, setLoading] = useState(false);

  const reset = async () => {
    if (!freepublishIds || !freepublishIds.length) return;

    setLoading(true);
    const res = await getIdsRule({
      ids: freepublishIds.join(','),
    });

    setLoading(false);
    updaterEventList(
      res.map((item: any, index: number) => ({
        ...item,
        index,
      })),
    );
  };

  const columns: any = [
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: formOptionToValueenum(eventTypeOptions),
      valueType: 'select',
      width: 80,
    },
    {
      title: '活动标题',
      dataIndex: 'sort',
      render: (dom: any, record: any) => record?.title || '',
      width: 200,
    },
    {
      title: '开始时间',
      valueType: 'dateTime',
      dataIndex: 'start_time',
      fieldProps: {
        format: 'YYYY-MM-DD HH:mm',
      },
      width: 180,
    },
    {
      title: '结束时间',
      valueType: 'dateTime',
      dataIndex: 'end_time',
      fieldProps: {
        format: 'YYYY-MM-DD HH:mm',
      },
      width: 180,
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 130,
      render: (dom: any, record: any) => {
        return (
          <Space>
            <Link
              to={`/workbench/application/project/event/basic/content/details?id=${id}&event_id=${record.id}`}
            >
              编辑
            </Link>
            <Link
              to={`/workbench/application/project/event/data/user?id=${id}&event_id=${record.id}`}
            >
              注册用户
            </Link>
            <Popconfirm
              key="delete"
              title="确定删除此项?"
              onConfirm={async () => {
                await removeRule(record.id);
                updaterEventList(dataSource.filter((item: any) => item.id !== record.id));
              }}
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const handleDragSortEnd = async (beforeIndex: number, afterIndex: number, newDataSource: any) => {
    updaterEventList(newDataSource);
  };

  // 有拖动排序
  // useEffect(() => {
  //   if (freepublishIds != null && freepublishIds.length != dataSource.length) {
  //     reset();
  //   }
  // }, [freepublishIds]);

  // 无拖动排序
  useEffect(() => {
    setLoading(true);
    queryAllRule({
      'filter[project_id]': id,
      sort: '-state,-created_at',
    }).then((res: any) => {
      setLoading(false);
      updaterEventList(
        res.map((item: any, index: number) => ({
          ...item,
          index,
        })),
      );
    });
  }, []);

  return (
    <>
      <DragSortTable
        {...props}
        loading={loading}
        toolBarRender={() => [...toolBarRender()]}
        tableStyle={{ padding: 0 }}
        columns={columns}
        rowKey="id"
        pagination={false}
        dataSource={dataSource}
        dragSortKey="sort"
        dragSortHandlerRender={() => <></>}
        onDragSortEnd={handleDragSortEnd}
      />
    </>
  );
};
