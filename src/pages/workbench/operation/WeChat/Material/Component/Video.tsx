import { useState, useRef } from 'react';
import { useModel } from '@umijs/max';
import { Button, Upload } from 'antd';
import { ProList } from '@ant-design/pro-components';
import VideoCard from './Video/Card';
import { queryMaterialRule } from '../service';

import { querySelectRule } from '@/pages/workbench/operation/WeChat/Authorizer/service';

const UploadFile = ({ appid, action }: any) => {
  const [loading, setLoading] = useState(false);

  const headers: any = {
    Authorization: `Bearer ${localStorage.getItem('lookstar-tenant-token')}`,
    'X-Tenant': localStorage.getItem('lookstar-tenant-X-Tenant'),
    'X-Requested-With': null,
  };

  return (
    <Upload
      key="upload"
      accept="video/*"
      showUploadList={false}
      name="file"
      action={`${API_URL}/tenant/wechat/material/wechat`}
      headers={headers}
      data={{
        appid,
        type: 'video',
      }}
      onChange={(data) => {
        setLoading(true);
        if (data.file.status === 'done') {
          setLoading(false);
          setTimeout(() => {
            action?.reload();
          }, 1000);
        }
      }}
    >
      <Button loading={loading}>上传视频</Button>
    </Upload>
  );
};

const Image: React.FC<any> = ({ appid, handleClickCard, ...props }) => {
  const { initialState } = useModel('@@initialState');
  const { authorizer }: any = initialState;
  const [fromAppid, setFromAppid] = useState(authorizer ? authorizer[0].value : '');
  const params: any = {
    type: 'video',
  };

  if (appid) params.appid = appid;

  return (
    <ProList
      params={params}
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
      }}
      request={queryMaterialRule}
      // // 暂时没有上传逻辑
      // toolBarRender={(action) => [
      //   <UploadFile key="upload" appid={appid || fromAppid} action={action} />,
      // ]}
      tableAlertRender={false}
      search={{
        filterType: 'light',
      }}
      metas={{
        appid: {
          title: '公众号',
          dataIndex: 'appid',
          key: 'appid',
          valueType: 'select',
          initialValue: fromAppid,
          fieldProps: {
            allowClear: false,
            onChange: setFromAppid,
          },
          search: !appid,
          request: querySelectRule,
        },
      }}
      grid={{ gutter: 16, column: 5 }}
      renderItem={(item) => (
        <VideoCard
          className="card-border-hover reset-actions-border-none"
          // style={{
          //   padding: 0,
          //   borderRadius: 12,
          //   // cursor: 'pointer',
          //   cursor: handleClickCard ? 'pointer' : 'default',
          // }}
          data={item}
          handleClickCard={handleClickCard}
        />
      )}
      {...props}
      // cardProps={{
      //   bodyStyle: {
      //     padding: 0,
      //   },
      // }}
    />
  );
};
export default Image;
