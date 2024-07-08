import { useState } from 'react';
import { Tooltip } from 'antd';
import { ModalForm } from '@ant-design/pro-components';
import Form from './Form';

export const Icon = (props: any) => {
  return (
    <div
      {...props}
      style={{ ...props.style }}
    >
      <svg
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        style={{ display: 'block' }}
      >
        <path d="M864.192 208H159.808a32 32 0 0 1 0-64h704.384a32 32 0 1 1 0 64z"></path>
        <path d="M512 893.024a32 32 0 0 1-32-32V209.6a32 32 0 0 1 64 0v651.424a32 32 0 0 1-32 32z"></path>
      </svg>
    </div>
  )
};

export default ({ onFinish }: any) => {
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
            paddingRight: 4,
          }}
        />
        文字
      </div>

      <ModalForm
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={onFinish}
        open={modalVisible}
        onOpenChange={setModalVisible}
        width={500}
        title="新建文字"
      >
        <Form />
      </ModalForm>
    </div>
  )
}
