import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import {
  queryRule as queryFreepublishRule,
  asyncRule as asyncFreepublishRule,
  getIdsRule as getIdsFreepublishRule,
} from '@/pages/workbench/operation/WeChat/Freepublish/service';
import FreepublishContent from '@/pages/workbench/operation/WeChat/Freepublish/components/Content';

import { syncPartRule } from '../../../../service';

export default ({ trigger, projectId, onReset, ...props }: any) => {
  const modalActionRef = useRef<any>();

  const [open, setOpen] = useState(false);
  const [freepublishIds, setFreepublishIds] = useState([]);

  const [asyncLoading, setAsyncLoading] = useState(false);
  const [articleSelectKeys, setArticleSelectKeys] = useState<any[]>([]);

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
    <div>
      {triggerDom}
      <Modal
        destroyOnClose={true}
        width={1100}
        footer={null}
        {...props}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <FreepublishContent
          actionRef={modalActionRef}
          rowSelection={{
            // selectedRowKeys: articleSelectKeys,
            onSelect: (record: any, clickType: boolean) => {
              let currentKeys = Array.from(new Set([...articleSelectKeys, record.id]));
              if (!clickType) {
                currentKeys = currentKeys.filter((item) => item != record.id);
              }
              setArticleSelectKeys(currentKeys);
            },
            onSelectAll: (clickType: any, selectedRows: any, changeRows: any) => {
              const currentSelectedRowsKeys = changeRows.map((item: any) => item.id);
              if (clickType) {
                setArticleSelectKeys([...articleSelectKeys, ...currentSelectedRowsKeys]);
              } else {
                setArticleSelectKeys(
                  articleSelectKeys.filter((item) => !currentSelectedRowsKeys.includes(item)),
                );
              }
            },
          }}
          search={{
            optionRender: (searchConfig: any, formProps: any, dom: any) => [
              ...dom.reverse(),
              <Button
                key="async"
                loading={asyncLoading}
                onClick={async () => {
                  setAsyncLoading(true);
                  await asyncFreepublishRule();
                  setAsyncLoading(false);
                  modalActionRef.current?.reload();
                }}
              >
                同步
              </Button>,
            ],
          }}
          request={queryFreepublishRule}
          params={{
            'filter[project_id]': projectId,
            'filter[repository]': 0,
          }}
          onOk={async ({ selectedRowKeys }: any) => {

            let newFreepublishIds = selectedRowKeys;
            if (freepublishIds) {
              newFreepublishIds = [...newFreepublishIds, ...freepublishIds];
            };

            await syncPartRule(projectId, {
              ids: newFreepublishIds,
            });
            onReset?.();
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  )
}
