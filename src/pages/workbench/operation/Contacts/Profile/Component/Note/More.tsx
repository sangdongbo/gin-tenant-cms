import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Modal, Spin, Timeline } from 'antd';
import type { ModalProps, TimelineProps } from 'antd';
import { useRequest } from '@umijs/max';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './styles.less';

interface PropsType {
  trigger: React.ReactElement;
  request: any;
  params?: any;
  postData?: (response: any[]) => any[];
  modalProps?: ModalProps;
  timelineProps?: TimelineProps;
}

export default ({ trigger, params, postData, request, modalProps, timelineProps }: PropsType) => {
  const [open, setOpen] = useState(false);
  const { data, run, loading } = useRequest(() => request?.(params), {
    manual: true,
  });

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

  useEffect(() => {
    if (open) run();
  }, [params, open]);

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
        {...modalProps}
      >
        <Spin spinning={loading}>
          <div
            id="scrollableDiv"
            style={{
              height: 400,
              overflow: 'auto',
            }}
          >
            {
              data?.length ? (
                <InfiniteScroll
                  dataLength={data?.length}
                  scrollableTarget="scrollableDiv"
                  next={() => { }}
                  hasMore={true}
                  loader={<></>}
                >
                  <div
                    className={styles['more-timeline']}
                    style={{
                      padding: '12px 12px 0 0'
                    }}
                  >
                    <Timeline
                      mode="left"
                      {...timelineProps}
                      items={postData && data ? postData(data) : data}
                    />
                  </div>
                </InfiniteScroll>
              ) : null
            }
          </div>
        </Spin>
      </Modal>
    </>
  )
}
