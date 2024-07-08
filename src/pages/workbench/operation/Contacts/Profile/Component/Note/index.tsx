import React from 'react';
import { useParams, useRequest } from '@umijs/max';
import { Empty, Spin, Button } from 'antd';
import dayjs from 'dayjs';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ProCard } from '@/components/BaseComponents';
import Create from './Create';
import Card from './Card';
import More from './More';

import { queryNotesRule, addNotesRule, deleteNotesRule } from '../../../service';

export default () => {
  const params = useParams();
  const id = params.id;
  const queryParams = {
    'filter[contact_id]': id,
    include: 'authUser',
  }
  const { data: dataSource, run, loading } = useRequest(() => queryNotesRule(queryParams));

  return (
    <ProCard
      bordered={false}
      style={{
        marginBottom: 24
      }}
      bodyStyle={{
        paddingTop: 0,
      }}
      title="笔记"
      extra={
        <Create
          title="新建笔记"
          trigger={<PlusCircleOutlined style={{ fontSize: 16, cursor: 'pointer' }} />}
          onFinish={async (formValue: any) => {
            await addNotesRule({
              ...formValue,
              contact_id: id,
            });
            run();
            return true;
          }}
        />
      }
    >
      <Spin spinning={loading}>
        {
          !dataSource?.length ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : null
        }
        {
          dataSource?.slice(0, 2)?.map((item: any, index: number) => {
            return (
              <Card
                key={index}
                {...item}
                onDelete={async () => {
                  await deleteNotesRule?.(item.id)
                  run();
                }}
              />
            )
          })
        }
      </Spin>
      {
        dataSource?.length > 2 ? (
          <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'center' }}>
            <More
              params={queryParams}
              request={queryNotesRule}
              postData={(response) => {
                return response?.map(item => ({
                  label: dayjs(item.created_at).format('YYYY.MM.DD HH:mm'),
                  children: item.note,
                }));
              }}
              modalProps={{
                title: '笔记',
              }}
              trigger={<Button>查看更多</Button>}
            />
          </div>
        ) : null
      }
    </ProCard>
  );
};
