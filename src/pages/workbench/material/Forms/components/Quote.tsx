import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Modal } from 'antd';
import { ProTable } from '@/components/BaseComponents';
import { projectType } from '@/pages/workbench/application/Project/components/ModalForm';
import formOptionToValueenum from '@/utils/formOptionToValueenum';


const Quote = (props: any) => {
  const columns: any[] = [
    {
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: formOptionToValueenum(projectType),
    },
    {
      title: '描述',
      dataIndex: 'description'
    },
    {
      title: '注册次数',
      dataIndex: 'contacts_count'
    },
  ];

  return (
    <ProTable
      cardProps={{
        bodyStyle: {
          padding: 0
        }
      }}
      options={false}
      search={false}
      columns={columns}
      {...props}
    />
  );
};

export default ({ trigger, fieldProps, request, ...props }: any) => {
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
        open={open}
        onCancel={(e) => {
          setOpen(false);
        }}
        afterClose={() => {
          setOpen(false);
        }}
        footer={false}
        width={800}
        {...props}
      >
        <Quote
          request={request}
          {...fieldProps}
        />
      </Modal>
    </>
  )
}
