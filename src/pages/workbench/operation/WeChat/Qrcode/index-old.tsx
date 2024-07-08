import React, { useState, useRef } from 'react';
import { Button, Modal, Switch, Space, QRCode } from 'antd';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import style from './index.less';
import ProTable from '@/components/BaseComponents/ProTable';

import { Form, Statistics } from './Components';
import { queryRule, addRule, updateRule } from './service';

const QrCode = ({ record, showLogo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal
        width={478}
        footer={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <QRCode
          size={430}
          iconSize={100}
          bordered={false}
          errorLevel="H"
          value={record?.url}
          bgColor="#ffffff"
          icon={showLogo ? record?.authorizer?.head_img : null}
        />
      </Modal>
      <div className={style.qrcode} onClick={() => setIsModalOpen(true)}>
        <div className={style.qrcodeBox}>
          <div>
            <EyeOutlined /> <span>预览</span>
          </div>
        </div>
        <QRCode
          size={54}
          iconSize={10}
          bordered={false}
          errorLevel="H"
          bgColor="#ffffff"
          value={record?.url}
          icon={showLogo ? record?.authorizer?.head_img : null}
        />
      </div>
    </>
  );
};

const TableList: React.FC<{}> = () => {
  const [showQrcodeLogo, setShowQrcodeLogo] = useState(true);
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [statisticsModalVisible, handleStatisticsModalVisible] = useState<boolean>(false);
  //   const [userModalVisible, handleUserModalVisible] = useState<boolean>(false);
  const [row, handleRow] = useState<any>();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns[] = [
    // {
    //   hideInTable: true,
    //   title: '时间筛选',
    //   valueType: 'dateTimeRange',
    //   dataIndex: 'select_time',
    //   fieldProps: {
    //     disabledDate: (current) => {
    //       return current && current >= moment().endOf('day');
    //     },
    //     ranges: {
    //       '上一月': [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')],
    //     }
    //   },
    // },
    {
      search: false,
      title: '公众号',
      dataIndex: ['authorizer', 'nick_name'],
    },
    {
      search: false,
      title: '名称',
      dataIndex: 'name',
    },
    {
      search: false,
      title: '二维码',
      dataIndex: 'id',
      render: (_, record) => <QrCode showLogo={showQrcodeLogo} record={record} />,
    },
    {
      search: false,
      title: 'UV',
      dataIndex: ['overview', 'uv'],
      //   render: (_, record) => (
      //     <Tooltip title="点击查看人员列表">
      //       <a
      //         onClick={() => {
      //           handleRow(record);
      //           handleUserModalVisible(true);
      //         }}
      //       >
      //         {_}
      //       </a>
      //     </Tooltip>
      //   ),
    },
    {
      search: false,
      title: 'PV',
      dataIndex: ['overview', 'pv'],
    },
    {
      search: false,
      title: '关注',
      dataIndex: ['overview', 'subscribe'],
    },
    // {
    //   title: '近7天数据',
    //   dataIndex: 'timeline',
    //   width: 350,
    //   render: (_) => <TinyArea data={_} />,
    // },
    {
      search: false,
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
    },
    {
      search: false,
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="statistics"
          onClick={() => {
            handleRow(record);
            handleStatisticsModalVisible(true);
          }}
        >
          统计
        </a>,
        <a
          key="option"
          onClick={() => {
            handleRow(record);
            handleUpdateModalVisible(true);
          }}
        >
          编辑
        </a>,
        <a
          key="export"
          onClick={() => {
            window.location.href = `${API_URL}/tenant/wechat/qrcode/${record?.id}/export?token=${localStorage.getItem(
              'lookstar-tenant-token',
            )}&tenant=${localStorage.getItem('lookstar-tenant-X-Tenant')}`;
          }}
        >
          导出
        </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        headerTitle="二维码管理"
        rowKey="id"
        toolBarRender={() => [
          <Space>
            二维码logo：
            <Switch
              checked={showQrcodeLogo}
              checkedChildren="显示"
              unCheckedChildren="隐藏"
              onChange={setShowQrcodeLogo}
            />
          </Space>,
          <Button key="id" icon={< PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
        ]}
        search={false}
        request={(params) => {
          const { select_time, ...handelParams } = params;
          if (select_time && select_time.length) {
            handelParams.start_time = select_time[0];
            handelParams.end_time = select_time[1];
          };
          return queryRule(handelParams);
        }}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />

      <Form
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={async (value: any) => {
          await addRule(value);
          handleModalVisible(false);
          actionRef.current?.reload();
          return true;
        }}
        open={modalVisible}
        onOpenChange={handleModalVisible}
        width={500}
        title="新建二维码"
      />
      {statisticsModalVisible ? (
        <Statistics
          open={statisticsModalVisible}
          onCancel={() => handleStatisticsModalVisible(false)}
          width={1000}
          title="二维码统计"
          row={row}
        />
      ) : null}
      {row ? (
        <Form
          onFinish={async (value: any) => {
            await updateRule({ ...value, id: row.id });
            handleUpdateModalVisible(false);
            handleRow(undefined);
            actionRef.current?.reload();
          }}
          initialValues={row}
          open={updateModalVisible}
          onOpenChange={(state: any) => {
            if (!state) {
              handleRow(undefined);
            }
            handleUpdateModalVisible(state);
          }}
          width={500}
          title="修改二维码"
        />
      ) : null}

      {/* {userModalVisible && row ? (
        <User
          initialValues={row}
          visible={userModalVisible}
          onCancel={() => {
            handleRow(undefined);
            handleUserModalVisible(false);
            actionRef.current?.reload();
          }}
          params={{ 'filter[group.id]': row.id }}
        />
      ) : null} */}
    </>
  );
};
export default TableList;
