import React, { useState, useMemo } from 'react';
import { Modal } from 'antd';

export default ({ trigger, ...props }: any) => {
  const [open, setOpen] = useState(false);

  const triggerDom = useMemo(() => {
    if (!trigger) {
      return null;
    };
    return React.cloneElement(trigger, {
      key: 'trigger',
      ...trigger.props,
      onClick: async (e: any) => {
        setOpen(!open);
        trigger.props?.onClick?.(e);
      },
    });
  }, [setOpen, trigger, open]);

  return (
    <>
      {triggerDom}
      <Modal
        destroyOnClose={true}
        {...props}
        open={open}
        onCancel={() => setOpen(false)}
      >
        您是否确定复制当前项目？
      </Modal>
    </>
  );
};
