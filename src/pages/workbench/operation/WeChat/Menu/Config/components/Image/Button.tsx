import { useState } from 'react';
import { Button, Upload } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import ModalForm from './ModalForm';

export const UploadFile = ({ appid, action }: any) => {
  const [loading, setLoading] = useState(false);
  return (
    <Upload
      accept='image/*'
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
        type: 'image',
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
        上传图片
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
        <path d="M937.472 102.4H91.136c-46.08 0-83.456 37.376-83.456 83.456V841.728c0 46.08 37.376 83.456 83.456 83.456h846.336c46.08 0 83.456-37.376 83.456-83.456V185.856c0-46.08-37.376-83.456-83.456-83.456zM91.136 163.84h846.336c12.288 0 22.016 9.728 22.016 22.016v437.248L762.88 448.512c-10.752-9.728-27.136-10.24-38.912-1.536l-244.224 183.296-129.536-92.16c-10.24-7.68-24.576-7.68-35.328 0l-245.76 174.08V185.856c0-12.288 9.728-22.016 22.016-22.016z m846.336 699.904H91.136c-12.288 0-22.016-9.728-22.016-22.016v-54.272L332.8 601.088l247.808 176.64c13.824 9.728 33.28 6.656 43.008-7.168 9.728-13.824 6.656-33.28-7.168-43.008l-84.48-59.904 208.896-156.672 211.456 187.904c2.048 2.048 4.608 3.072 7.168 4.608v138.24c0 12.288-9.728 22.016-22.016 22.016z" fill="#646464"></path>
        <path d="M312.32 471.04c70.656 0 128-57.344 128-128S382.976 215.04 312.32 215.04 184.32 272.384 184.32 343.04s57.344 128 128 128z m0-194.56c36.864 0 66.56 29.696 66.56 66.56s-29.696 66.56-66.56 66.56-66.56-29.696-66.56-66.56 29.696-66.56 66.56-66.56z"></path>
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
        图片
      </div>

      <ModalForm
        appid={appid}
        title="选择图片"
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
