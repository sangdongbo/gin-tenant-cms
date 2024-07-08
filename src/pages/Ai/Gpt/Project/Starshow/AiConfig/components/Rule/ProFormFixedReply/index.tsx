import React from 'react';
import { Button, Space, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProFormItemProps, ProColumns } from '@ant-design/pro-components';
import { ProForm } from '@ant-design/pro-components';
import { ProTable } from "@/components/BaseComponents";
import Create from './Create';
import Update from './Update';

interface PropsType extends ProFormItemProps {

};

const CustomFixedReply = ({ value, onChange }: any) => {
  let currentValue = value ? JSON.parse(JSON.stringify(value)) : [];
  const columns: ProColumns[] = [
    {
      title: '标准问题',
      dataIndex: 'standard_issues',
    },
    {
      title: '相似问题',
      dataIndex: 'similar_problems',
      render: (dom: any, record: any) => {
        return <>
          {record?.similar_problems?.map((item: any) => item.text).join(',')}
        </>
      }
    },
    {
      title: '答案',
      dataIndex: 'answer',
    },
    {
      title: '操作',
      width: 200,
      dataIndex: 'option',
      render: (dom: any, record: any, dataIndex: number) => {
        return (
          <Space>
            <Update
              initialValues={record}
              key="update"
              title="修改回复"
              trigger={<a>编辑</a>}
            />
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={async (e) => {
                currentValue.splice(dataIndex, 1);
                onChange(currentValue);
              }}
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </Space>
        );
      }
    },
  ];

  return (
    <div>
      <Create
        title="新建回复"
        trigger={<Button icon={<PlusOutlined />}>新建</Button>}
        onFinish={async (formValue: any) => {
          currentValue.push(formValue);
          onChange(currentValue);
          return true;
        }}
      />
      <ProTable
        rowKey="standard_issues"
        pagination={false}
        dataSource={value}
        search={false}
        columns={columns}
        cardProps={{
          bodyStyle: {
            padding: 0
          }
        }}
      />
    </div>
  )
}

const ProFormFixedReply = ({ fieldProps, ...props }: PropsType) => {
  return (
    <ProForm.Item {...props}>
      <CustomFixedReply {...fieldProps} />
    </ProForm.Item>
  );
};

export default ProFormFixedReply;
