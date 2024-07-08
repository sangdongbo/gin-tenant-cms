import React, { useEffect, useState } from 'react';
import { Button, Divider, Popconfirm } from 'antd';
import clearRichTextTag from '@/utils/clearRichTextTag';

import ProTable from '@/components/BaseComponents/ProTable';
import Add from './Add';
import Update from './Update';

export default ({ projectId, updaterRegister, onPublish, value, ...props }: any) => {
  const [publishLoading, setPublishLoading] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>([]);

  const columns: any[] = [
    {
      dataIndex: 'content',
      title: '文案',
      render: (_: any, record: any) => {
        return <div dangerouslySetInnerHTML={{ __html: clearRichTextTag(record.content) }} />
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'option',
      width: 200,
      render: (_: any, record: any, index: number) => {
        return (
          <>
            <Update
              initialValue={record}
              onFinish={(values: any) => {
                const currentDataSource = JSON.parse(JSON.stringify(dataSource));
                currentDataSource[index] = {
                  ...currentDataSource[index],
                  ...values,
                };

                updaterRegister({
                  privacy_policy: currentDataSource,
                });
                // setDataSource(currentDataSource);
              }}
            />
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除此项?"
              onConfirm={async () => {
                const currentDataSource = JSON.parse(JSON.stringify(dataSource));
                currentDataSource.splice(index, 1);
                updaterRegister({
                  privacy_policy: currentDataSource,
                });
                // setDataSource(currentDataSource);
              }}
            >
              <a style={{ color: 'red' }}>
                删除
              </a>
            </Popconfirm>
          </>
        )
      }
    }
  ];

  useEffect(() => {
    setDataSource(value.privacy_policy || []);
  }, [value]);

  return (
    <>
      <ProTable
        search={false}
        options={false}
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        toolBarRender={() => [
          <Add
            key="add"
            onFinish={(values: any) => {
              updaterRegister({
                privacy_policy: [...dataSource, values],
              });
            }}
          />,
          <React.Fragment key="publish">
            {onPublish ? (
              <Button
                type="primary"
                loading={publishLoading}
                onClick={async () => {
                  setPublishLoading(true);
                  await onPublish?.(dataSource);
                  setPublishLoading(false);
                }}
              >
                发布
              </Button>
            ) : null}
          </React.Fragment>
        ]}
        {...props}
      />
    </>
  )
};
