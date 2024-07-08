import React from 'react';
import classnames from "classnames";
import handleUint8Array from '@/utils/handleUint8Array';
import handlepopText from '@/utils/handlepopText';

import SourceDocuments from './SourceDocuments';
import PresetQuestions from './PresetQuestions';

import './index.less';

export default ({ sending, error, showReferences, preset_question = [], source_documents = [], content, onPresetQuestions, onRetry }: any) => {

  let stringContent = content || '请耐心等待....';
  if (error == 1) {
    stringContent = '您的请求已超时，请点击重试';
  };

  const { text, list } = handleUint8Array(stringContent);

  return (
    <div className="chat-text-robot">
      <div className="chat-text-robot-content">
        <div className="chat-text-robot-content-text">
          <div className={classnames({ editable: sending })} style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: handlepopText(text, sending) }} />
          {
            error == 1 ? (
              <div className="chat-text-robot-content-text-retry" onClick={() => onRetry?.()}>
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M192 512c0-85.504 33.28-165.888 93.696-226.304 60.416-60.416 140.8-93.696 226.304-93.696 54.784 0 109.056 14.336 156.672 40.96 38.912 22.016 72.704 51.712 99.328 87.04h-128c-17.92 0-31.744 14.336-31.744 31.744s14.336 31.744 31.744 31.744h192c17.92 0 31.744-14.336 31.744-31.744v-192c0-17.92-14.336-31.744-31.744-31.744s-31.744 14.336-31.744 31.744v97.792c-28.672-32.256-61.952-59.904-99.84-80.896-57.344-32.256-122.368-49.152-188.416-49.152-51.712 0-101.888 10.24-149.504 30.208-45.568 19.456-87.04 47.104-121.856 82.432a385.5872 385.5872 0 0 0-82.432 121.856c-19.968 47.616-30.208 97.792-30.208 149.504 0 17.92 14.336 31.744 31.744 31.744s32.256-13.312 32.256-31.232z m672.256-31.744c-17.92 0-31.744 14.336-31.744 31.744 0 85.504-33.28 165.888-93.696 226.304-60.928 60.416-141.312 93.696-226.816 93.696-54.784 0-109.056-14.336-156.672-40.96-38.912-22.016-72.704-51.712-99.328-87.04h128c17.92 0 31.744-14.336 31.744-31.744s-14.336-31.744-31.744-31.744h-192c-17.92 0-31.744 14.336-31.744 31.744v192c0 17.92 14.336 31.744 31.744 31.744s31.744-14.336 31.744-31.744v-97.792c28.672 32.256 62.464 59.904 99.84 80.896 57.344 32.256 122.368 49.152 188.416 49.152 51.712 0 101.888-10.24 149.504-30.208 45.568-19.456 87.04-47.104 121.856-82.432 35.328-35.328 62.976-76.288 82.432-121.856 19.968-47.616 30.208-97.792 30.208-149.504 0-18.432-14.336-32.256-31.744-32.256z" />
                </svg>
                点击重试
              </div>
            ) : null
          }

          {/* 因为首次创建的时候无法设置显示的值，所以 undefined 也是当显示判断 */}
          {
            Number(showReferences) !== 0 ? (
              <SourceDocuments
                list={list}
              />
            ) : null
          }
          <PresetQuestions
            list={preset_question}
            onPresetQuestions={(item: any) => onPresetQuestions?.(item)}
          />
        </div>
      </div>
    </div>
  )
}
