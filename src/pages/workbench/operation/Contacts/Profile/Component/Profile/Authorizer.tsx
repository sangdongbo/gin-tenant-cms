import { useEffect, useState } from 'react';
import { Avatar, Space, Badge, Button } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import dayjs from 'dayjs';

import AuthorizerMore from './AuthorizerMore';

import { queryOpenidRule } from '../../service';

const subscribeEnum = {
  0: { text: '未关注', status: 'default' },
  1: { text: '已关注', status: 'success' },
};

export default ({ id }: any) => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const colums = [
    {
      title: '微信信息',
      dataIndex: 'avatar',
      render: (_: any, record: any) => (
        <Space size={6}>
          <Avatar src={record?.avatar} />
          {record.nickname}
        </Space>
      ),
    },
    {
      title: '公众号信息',
      dataIndex: 'nickname',
      render: (_: any, record: any) => (
        <Space size={6} direction="vertical">
          <div>{record?.authorizer_nickname}</div>
          <div>
            <Badge {...subscribeEnum[record?.subscribe]} />
          </div>
          <div>
            关注时间：
            {record?.subscribe_time
              ? dayjs(record.subscribe_time * 1000).format('YYYY-MM-DD')
              : null}
          </div>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    queryOpenidRule(id)
      .then((res) => {
        setLoading(false);
        setDataSource(res);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <ProTable
        rowKey="id"
        size="small"
        loading={loading}
        search={false}
        options={false}
        toolBarRender={false}
        pagination={false}
        columns={colums}
        dataSource={dataSource?.slice(0, 2)}
      />

      {
        dataSource?.length > 2 ? (
          <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'center' }}>
            <AuthorizerMore
              dataSource={dataSource}
              modalProps={{
                title: '微信授权',
              }}
              trigger={<Button>查看更多</Button>}
              tableProps={{
                columns: colums,
                dataSource: dataSource
              }}
            />
          </div>
        ) : null
      }
    </>
  );
};
