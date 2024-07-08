// src/global.tsx

import { Modal, Result } from 'antd';
import React from 'react';

const originLazy = React.lazy;

React.lazy = (factory) => {
  return originLazy(() => factory().catch(loadError));
};

let hasError = false;
function loadError(): { default: React.ComponentType<unknown> } {
  const time = Number(window.location.hash.match(/#s(\d+)/)?.[1]);
  const now = Date.now();
  const isReloading = !time || time + 10000 < now;
  if (isReloading) {
    window.location.hash = `#s${now}`;
    window.location.reload();
  }

  const module = {
    default: () => {
      if (hasError) {
        return null;
      }
      hasError = true;
      return (
        <Modal
          open
          cancelButtonProps={{
            style: {
              display: 'none',
            },
          }}
          onOk={() => {
            window.location.reload();
          }}
          okText="重试"
        >
          <Result title="错误提示" status="error">
            哎呀，出了问题。
          </Result>
        </Modal>
      );
    },
  };

  return module;
}
