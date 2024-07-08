import { useState, useRef } from 'react';
import { Button, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-components';
import ProTable from '@/components/BaseComponents/ProTable';

import { Form } from './Components';
import { queryRule, addRule, updateRule, removeRule } from './service';

export default ({ type }: any) => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  // const [userModalVisible, handleUserModalVisible] = useState<boolean>(false);
  const [row, handleRow] = useState<any>();
  const actionRef = useRef<any>();
  const columns: ProColumns[] = [
    {
      title: '公众号',
      dataIndex: ['authorizer', 'nick_name'],
      width: 100,
    },
    {
      title: '名称',
      dataIndex: 'text',
      width: 150,
    },

    {
      title: 'UV',
      dataIndex: ['overview', 'uv'],
      width: 50,
    },
    {
      title: 'PV',
      dataIndex: ['overview', 'pv'],
      width: 50,
    },
    // {
    //   title: '近7天数据',
    //   dataIndex: 'timeline',
    //   width: 350,
    //   render: (_, record) => <TinyArea data={_} />,
    // },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      width: 160,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            handleRow(record);
            handleUpdateModalVisible(true);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定要删除吗?"
          onConfirm={() => removeRule(record.id).then(() => actionRef.current?.reset())}
        >
          <a style={{ color: 'red' }}>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        headerTitle="自动回复"
        rowKey="id"
        toolBarRender={() => [
          <Button
            key="add"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        options={{
          search: {
            name: 'filter[text]',
          },
        }}
        params={{
          'filter[type]': type,
        }}
        search={false}
        request={(params) => queryRule(params)}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={async (value) => {
          await addRule({ ...value, type });
          handleModalVisible(false);
          actionRef.current?.reload();
          return true;
        }}
        open={modalVisible}
        onOpenChange={handleModalVisible}
        width={500}
        title="新建自动回复"
      >
        <Form type={type} />
      </ModalForm>
      {row ? (
        <ModalForm
          onFinish={async (value) => {
            await updateRule({ ...value, id: row.id });
            handleUpdateModalVisible(false);
            handleRow(undefined);
            actionRef.current?.reload();
          }}
          initialValues={row}
          open={updateModalVisible}
          onOpenChange={(state) => {
            if (!state) {
              handleRow(undefined);
            }
            handleUpdateModalVisible(state);
          }}
          width={500}
          title="修改自动回复"
        >
          <Form type={type} />
        </ModalForm>
      ) : null}
    </>
  );
};
