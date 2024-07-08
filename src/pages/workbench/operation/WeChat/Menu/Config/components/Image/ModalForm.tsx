import { useState } from 'react';
import { Modal, Button, Upload } from 'antd';
import { ProList } from '@ant-design/pro-components';
import { queryMaterialRule } from '../../../service';
import styles from './style.less';

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
          setTimeout(() => {
            action?.reload();
          }, 500);
        };
      }}
    >
      <Button loading={loading}>
        上传图片
      </Button>
    </Upload>
  )
};

export default ({ appid, onFinish, ...props }: any) => {
  return (
    <Modal
      {...props}
    >
      <ProList
        params={{
          appid,
          type: 'image',
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
        }}
        request={queryMaterialRule}
        toolBarRender={(action) => [<UploadFile key="upload" appid={appid} action={action} />]}
        itemCardProps={{
          className: 'card-border-hover reset-actions-border-none',
          style: {
            padding: 0,
            borderRadius: 12,
            cursor: 'pointer',
            width: '100%',
          },
          bodyStyle: {
            color: '#666666',
            padding: '10px 24px 24px 33px',
          },
        }}
        tableAlertRender={false}
        rowSelection={{
          type: 'radio',
          onChange: (_, selectedRows) => {
            onFinish?.(selectedRows[0]);
            // setModalVisible(false);
          },
        }}
        grid={{ gutter: 16, column: 5 }}
        metas={{
          content: {
            render: (_: any, record: any) => {
              return (
                <div className={styles['preview-content']}>
                  <img className={styles['preview-image']} src={record.url} alt="preview-image" />
                </div>
              );
            },
          },
        }}
        cardProps={{
          bodyStyle: {
            padding: 0
          }
        }}
      />
    </Modal>
  )
}
