import { useState, useRef } from 'react';
import { Button, Modal, message, Typography, QRCode } from 'antd';
import { useModel } from '@umijs/max';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable, ProQRcode } from '@/components/BaseComponents';

import qs from 'qs';
import formOptionToValueenum from '@/utils/formOptionToValueenum';
import downloadQRCode from '@/utils/downloadQRCode';

import Form from './Form';

import { queryRule, addRule } from '@/services/tenant/utm/api';

const { Paragraph } = Typography;

const handleUtm = (url: string, utmOptions: any) => {
  let queryBase: any = {
    appid: utmOptions?.appid,
    utm_campaign: utmOptions?.utm_campaign,
    utm_source: utmOptions?.utm_source,
    utm_medium: utmOptions?.utm_medium,
    utm_term: utmOptions?.utm_term,
    utm_content: utmOptions?.utm_content,
  };
  const newQueryBase: any = {};
  Object.keys(queryBase).map((item) => {
    if (queryBase[item]) newQueryBase[item] = queryBase[item];
  });
  const urlQuery = qs.stringify(newQueryBase);
  const baseUrl = url.includes('?') ? `${url}&${urlQuery}` : `${url}?${urlQuery}`;
  return baseUrl;
};

export default ({ url, params, addParams, projectId, ...props }: any) => {
  const [channelVisible, setChannelVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const [qrCodeVisible, setQRCodeVisible] = useState(false);
  const [channelUrl, setChannelUrl] = useState('');

  const { initialState } = useModel('@@initialState');
  const authorizerList = initialState?.authorizer || [];

  const columns: ProColumns[] = [
    {
      title: '公众号',
      dataIndex: 'appid',
      valueEnum: formOptionToValueenum(authorizerList),
      width: 180,
    },
    {
      title: '活动名称',
      dataIndex: 'utm_campaign',
      width: 100,
    },
    {
      title: '广告来源',
      dataIndex: 'utm_source',
      width: 100,
    },
    {
      title: '广告媒介',
      dataIndex: 'utm_medium',
      width: 100,
    },
    {
      title: '关键词',
      dataIndex: 'utm_term',
      width: 100,
    },
    {
      title: '广告内容',
      dataIndex: 'utm_content',
      width: 100,
    },
    {
      title: '链接',
      dataIndex: 'url',
      width: 300,
      render: (text, record) => {
        const baseUrl = handleUtm(url, record);

        return (
          <div style={{ width: 290 }}>
            <Paragraph copyable ellipsis style={{ marginBottom: 0 }}>
              {baseUrl}
            </Paragraph>
          </div>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      editable: false,
      width: 200,
    },
    {
      title: '操作',
      width: 150,
      valueType: 'option',
      render: (text, record, _, action) => {
        const baseUrl = handleUtm(url, record);

        return [
          <ProQRcode key="qrcode" trigger={<a>生成二维码</a>} url={baseUrl} />,
          // <a
          //   key="qrcode"
          //   onClick={() => {
          //     setChannelUrl(baseUrl);
          //     setQRCodeVisible(true);
          //   }}
          // >
          //   生成二维码
          // </a>,
        ];
      },
    },
  ];

  return (
    <>
      <Modal
        title="链接二维码"
        open={qrCodeVisible}
        footer={null}
        width={300}
        onCancel={() => {
          setQRCodeVisible(false);
        }}
      >
        <div id="channelQRCode" style={{ display: 'flex', justifyContent: 'center' }}>
          <QRCode size={128} bordered={false} value={channelUrl} bgColor="#ffffff" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 16 }}>
          <Button onClick={() => downloadQRCode('channelQRCode')}>点击下载</Button>
        </div>
      </Modal>

      <ProTable
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        search={false}
        headerTitle="生成链接"
        params={{
          'filter[project_id]': projectId,
          ...params,
        }}
        request={queryRule}
        toolBarRender={() => [
          <Button
            key="newChannel"
            type="primary"
            onClick={() => {
              setChannelVisible(true);
            }}
          >
            创建链接
          </Button>,
        ]}
        {...props}
      />

      <Form
        modalProps={{
          destroyOnClose: true,
        }}
        open={channelVisible}
        onOpenChange={setChannelVisible}
        title="创建链接"
        width={600}
        onFinish={async (values: any) => {
          await addRule({
            ...values,
            project_id: projectId,
            type: 'inside',
            ...addParams,
          });
          message.success('创建成功');
          actionRef.current?.reload();
          setChannelVisible(false);
          return true;
        }}
      />
    </>
  );
};
