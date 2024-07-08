import React, { useEffect, useState } from 'react';
// import { SafeArea, TextArea } from 'antd-mobile/2x';
import { Input } from 'antd';
import classnames from 'classnames';

import './index.less';

export default ({ onSend, disabled }: any) => {
  const [value, setValue] = useState<any>('');

  const onClick = () => {
    if (disabled || !`${value}`.trim()) return;
    onSend?.(value);
    // sensors?.track('user_ai_chat', {
    //   item_key: value,
    // });
    setValue('');
  }

  return (
    <div className="chat-text-send">
      <div className="chat-text-send-box">
        <div className="chat-text-send-box-textarea-box">
          <Input
            value={value}
            className="chat-text-send-box-textarea"
            disabled={disabled}
            // autoSize={{
            //   minRows: 1,
            //   maxRows: 3,
            // }}
            // rows={1}
            placeholder="输入您的问题......"
            onChange={(event) => setValue(event.target.value)}
          />
          <div
            className={classnames('chat-text-send-box-textarea-audio', {
              disabled: true,
            })}
          />
        </div>
        <div
          className={classnames('chat-text-send-box-submit', {
            disabled: !`${value}`.trim() || disabled,
          })}
          onClick={() => onClick()}
        >
          <img src={require('@/assets/images/preview/send.png')} alt="send" />
        </div>
      </div>
      {/* <SafeArea position='bottom' /> */}
    </div>
  )
}
