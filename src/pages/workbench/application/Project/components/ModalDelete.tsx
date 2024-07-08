import { useState } from 'react';
import { Modal } from 'antd';

export default ({ onOk, ...props }: any) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  return (
    <Modal
      {...props}
      confirmLoading={confirmLoading}
      onOk={async () => {
        setConfirmLoading(true);
        await onOk();
        setConfirmLoading(false);
      }}
    >
      您是否确定删除当前项目？
    </Modal>
  );
};
