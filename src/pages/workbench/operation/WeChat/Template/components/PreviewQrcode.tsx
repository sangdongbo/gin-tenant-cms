import { useState } from 'react';
import { Modal, Spin, QRCode } from 'antd';

import { getPreviewQrcodeRule } from '../service';

const QrCode = ({ record }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [perviewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal width={430} footer={null} open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
        <Spin spinning={loading}>
          <div style={{ width: 382, height: 382 }}>
            <QRCode
              size={382}
              bordered={false}
              value={perviewUrl}
              bgColor={'#ffffff'}
            />
          </div>
        </Spin>
      </Modal>
      <a
        onClick={() => {
          if (!perviewUrl) {
            setLoading(true);
            getPreviewQrcodeRule({
              appid: record.appid,
              id: record.id,
            }).then((res) => {
              setLoading(false);
              setPreviewUrl(res.url);
            });
          }
          setIsModalOpen(true);
        }}
      >
        预览
      </a>
    </>
  );
};

export default QrCode;
