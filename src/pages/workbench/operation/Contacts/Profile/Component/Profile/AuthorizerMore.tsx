import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Modal, Spin, Timeline } from 'antd';
import type { ModalProps } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import type { ProTableProps } from '@ant-design/pro-components';

interface PropsType {
  trigger: React.ReactElement;
  dataSource: any[];
  modalProps?: ModalProps;
  tableProps?: ProTableProps<any[], any, any>;
}

export default ({ trigger, modalProps, tableProps }: PropsType) => {
  const [open, setOpen] = useState(false);


  const triggerDom = useMemo(() => {
    if (!trigger) {
      return null;
    }

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
        open={open}
        onCancel={(e) => {
          setOpen(false);
        }}
        afterClose={() => {
          setOpen(false);
        }}
        footer={false}
        width={600}
        {...modalProps}
      >
        <ProTable
          rowKey="id"
          size="small"
          search={false}
          options={false}
          toolBarRender={false}
          pagination={false}
          {...tableProps}
        />
      </Modal>
    </>
  )
}
