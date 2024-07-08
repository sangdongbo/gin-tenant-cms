import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ModalForm } from '@ant-design/pro-components';
import { Badge, Button, Popconfirm, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import formOptionToValueenum from '@/utils/formOptionToValueenum';
import {
  addUserRule,
  changeUserRule,
  queryUserRule,
  removeUserRule,
  selectRoleRule,
} from '../service';
import Form from './components/Form';

export default () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [row, setRow] = useState<any>();
  const [roles, setRoles] = useState([]);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      readonly: true,
    },
    {
      title: '部门',
      dataIndex: 'roles',
      valueType: 'select',
      // fieldProps: { mode: 'multiple' },
      valueEnum: formOptionToValueenum(roles),
      // params: {
      //   cacheTime: new Date(),
      // },
      // request: selectRoleRule,
    },
    {
      title: '状态',
      dataIndex: 'is_active',
      valueType: 'switch',
      fieldProps: { checkedChildren: '开启', unCheckedChildren: '关闭' },
      formItemProps: {
        getValueFromEvent: (e) => (e ? 1 : 0),
      },
      render: (_, record: any) => {
        const badgeValue: any = record.is_active
          ? {
              status: 'success',
              text: '开启',
            }
          : {
              status: 'error',
              text: '关闭',
            };

        return <Badge {...badgeValue} />;
      },
    },
    {
      title: '最后登录',
      dataIndex: 'logintime',
      valueType: 'dateTime',
      readonly: true,
    },
    {
      title: '加入时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      readonly: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      hideInSearch: true,
      valueType: 'option',
      render: (text, record: any, _, action) => {
        if (record.is_admin == 0) {
          return [
            <a
              key="eidt"
              onClick={() => {
                action?.startEditable?.(record.id);
                // setUpdateModalVisible(true);
                // setRow(record);
              }}
            >
              编辑
            </a>,
            <Popconfirm
              key="delele"
              title="确定删除此项?"
              onConfirm={async () => {
                await removeUserRule(record.id);
                action?.reload();
              }}
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>,
          ];
        }
      },
    },
  ];

  useEffect(() => {
    selectRoleRule().then((res) => {
      setRoles(res);
    });
  }, []);

  return (
    <>
      <EditableProTable
        recordCreatorProps={false}
        headerTitle="管理员设置"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            key="add"
            type="primary"
            onClick={() => setModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        editable={{
          onSave: (key: any, record: any) =>
            changeUserRule({
              id: record.id,
              roles: record.roles,
              is_active: record.is_active,
            }),
          actionRender: (_, config, defaultDom) => {
            return [
              <Space style={{ width: '100%' }}>
                {defaultDom.save}
                {defaultDom.cancel}
              </Space>,
            ];
          },
        }}
        options={{ fullScreen: false, reload: true, setting: true }}
        search={false}
        request={(params) => queryUserRule({ ...params, include: 'roles' })}
        columns={columns}
        pagination={{ showSizeChanger: false, defaultPageSize: 10 }}
        postData={(data) =>
          data.map((item: any) => ({
            ...item,
            // sourceData: item?.roles,
            roles: item?.roles.map((it: any) => `${it.id}`),
            sourceRoles: item?.roles,
          }))
        }
      />
      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={async (value: any) => {
          await addUserRule(value);
          setModalVisible(false);
          actionRef?.current?.reload();
          return true;
        }}
        open={modalVisible}
        onOpenChange={setModalVisible}
        width={500}
        title="新建员工"
      >
        <Form />
      </ModalForm>
      {row ? (
        <ModalForm
          onFinish={async (value: any) => {
            await changeUserRule({ ...value, id: row.id });
            setUpdateModalVisible(false);
            setRow(undefined);
            actionRef?.current?.reload();
          }}
          id={row.id}
          open={updateModalVisible}
          onOpenChange={(state: any) => {
            if (!state) {
              setRow(undefined);
            }
            setUpdateModalVisible(state);
          }}
          width={500}
          title="修改员工"
        >
          <Form />
        </ModalForm>
      ) : null}
    </>
  );
};
