import React, { useState, useMemo, useRef, useImperativeHandle } from 'react';
import { Drawer } from 'antd';

export default ({ trigger, children, ...props }: any) => {
  const actionRef = useRef<{
    setOpen: (value: boolean) => void;
  }>();

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

  useImperativeHandle(actionRef, () => ({
    setOpen,
  }));


  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      // extraVariable,
      actionRef,
    })
  );

  return (
    <>
      {triggerDom}
      <Drawer
        destroyOnClose={true}
        width="90%"
        {...props}
        open={open}
        onClose={() => setOpen(false)}
      >
        {childrenWithProps}
      </Drawer>
    </>
  )
};
