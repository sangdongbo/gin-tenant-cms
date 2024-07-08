import React, { useState, useRef } from 'react';
import { Button, Modal, Typography } from 'antd';
import { PlusOutlined, WechatOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import ProTable from '@/components/BaseComponents/ProTable';
import { useModel } from '@umijs/max';

import { queryRule } from './service';

const TableList: React.FC<{}> = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns[] = [
    {
      title: '公众号',
      dataIndex: 'nick_name',
    },
    {
      title: 'AppID',
      dataIndex: 'appid',
    },
    {
      title: '类型',
      dataIndex: 'type_text',
    },
    {
      title: 'App类型',
      dataIndex: 'app_type',
    },
    {
      title: '授权状态',
      dataIndex: 'subscribe',
      render: (_) => <span>{_ ? '已授权' : '已解除'}</span>,
    },
    {
      title: '授权时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
    },
    {
      title: '最后更新时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
    },
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   render: (_, record) => {
    //     if (record.type == 2 && record.app_type != 1) {
    //       return (
    //         <a
    //           onClick={() =>
    //             addMicrobookRule({ appid: record.appid }).then((result) =>
    //               actionRef?.current?.reload(),
    //             )
    //           }
    //         >
    //           设为微刊
    //         </a>
    //       );
    //     }
    //   },
    // },
  ];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button icon={< PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
        ]}
        headerTitle="帐号授权"
        search={false}
        request={(params: any) => queryRule(params)}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="关于账号授权"
        open={modalVisible}
        footer={
          <Button
            type="link"
            block
            onClick={() => {
              handleModalVisible(false);
              window.open(
                `${API_URL}/central/wechat/authorizer/view?tenant=${localStorage.getItem(
                  'lookstar-tenant-X-Tenant',
                )}&auth_user_id=${currentUser?.id}`,
              );
            }}
          >
            <WechatOutlined />
            授权公众号
          </Button>
        }
        onCancel={() => handleModalVisible(false)}
      >
        <Typography.Paragraph>
          <ul>
            <li>通过第三方授权，您可以将当前平台作为一个符合微信规范的第三方应用给予授权</li>
            <li>
              授权后，当前平台将对应的公众号的统计信息整合到检测环境中，实现公众号信息与公众号站点信息的关联
            </li>
            <li>请点击下面的按钮，跳转至微信公众平台，完成登录授权</li>
          </ul>
        </Typography.Paragraph>
      </Modal>
    </>
  );
};
export default TableList;
