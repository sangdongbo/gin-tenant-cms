import { useState } from 'react';
import { Button, Upload } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import ModalForm from './ModalForm';

export const UploadFile = ({ appid, action }: any) => {
  const [loading, setLoading] = useState(false);
  return (
    <Upload
      accept='video/*'
      showUploadList={false}
      key="upload"
      name="file"
      action={`${API_URL}/tenant/wechat/material/wechat`}
      headers={{
        Authorization: `Bearer ${localStorage.getItem('lookstar-tenant-token')}`,
        'X-Tenant': localStorage.getItem('lookstar-tenant-X-Tenant'),
        'X-Requested-With': null,
      }}
      data={{
        appid,
        type: 'video',
      }}
      onChange={(data) => {
        setLoading(true);
        if (data.file.status === 'done') {
          setLoading(false);
          action?.reload();
        };
      }}
    >
      <Button loading={loading}>
        上传视频
      </Button>
    </Upload>
  )
};


export const Icon = (props: any) => {
  return (
    <div {...props} style={{ ...props.style }}>
      <svg
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        style={{ display: 'block' }}
      >
        <path d="M896.128 128a64 64 0 0 1 63.872 62.08v626.688a64 64 0 0 1-62.08 63.872H127.872A64 64 0 0 1 64 818.56V191.872A64 64 0 0 1 126.08 128h770.048z m-7.872 71.68H135.68v609.28h752.64V199.68zM410.688 349.504a48.32 48.32 0 0 1 46.72-0.896l1.536 0.896 226.048 130.816a48.576 48.576 0 0 1 1.536 82.88l-1.536 0.96-226.048 130.816a48.128 48.128 0 0 1-72.32-40.128l-0.064-1.792V391.424c0-17.28 9.216-33.28 24.128-41.92zM458.24 414.72v215.04l179.2-107.52-179.2-107.52z" fill="#646464" />
      </svg>
    </div>
  )
};

export default ({ appid, onFinish }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => setModalVisible(true)}
      >
        <Icon
          style={{
            paddingRight: 6,
          }}
        />
        视频
      </div>

      <ModalForm
        appid={appid}
        title="选择视频"
        destroyOnClose={true}
        open={modalVisible}
        // onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={null}
        bodyStyle={{
          padding: '0 24px'
        }}
        width={1000}
        onFinish={async (values: any) => {
          await onFinish(values);
          setModalVisible(false);
        }}
      />
    </div>
  )
}
