import React, { useContext } from 'react';
import { uniqBy } from 'lodash';
import classNames from 'classnames';
import BaseSettingsContent from '../../../BaseSettingsContent';
import './index.less';

const getUrlType = (url: any) => {
  if (/\.pdf$/i.test(url)) {
    return 'pdf';
  } else if (/\.ppt$|\.pptx$/i.test(url)) {
    return 'ppt';
  } else if (/\.docx$/i.test(url)) {
    return 'docx';
  } else {
    return 'wechat';
  }
}

export default ({ list }: any) => {
  const currentList = uniqBy(list, 'metadata.title');
  const { baseSettings, projectId }: any = useContext(BaseSettingsContent);
  if (!currentList?.length) return null;

  return (
    <div className="chat-text-robot-source-documents">
      {
        currentList.map((item: any, index: number) => {
          const { metadata } = item;
          const urlType = getUrlType(metadata?.source);
          return (
            <div key={index} className={classNames('chat-text-robot-source-documents-file', urlType)}>
              <div className="chat-text-robot-source-documents-file-box">
                <div className="chat-text-robot-source-documents-file-box-text">
                  <a href={metadata?.source?.replace('http:', 'https:')}>
                    {metadata?.title}
                  </a>
                </div>
                {
                  baseSettings?.data?.is_download && metadata?.is_download ? (
                    <div
                      className="chat-text-robot-source-documents-file-download"
                    >
                      <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M489.984 832c1.536 1.536 3.072 2.56 4.608 4.096h0.512c1.536 1.024 3.072 2.048 5.12 2.56h0.512c1.536 0.512 3.584 1.024 5.12 1.536h0.512c2.048 0.512 3.584 0.512 5.632 0.512 2.048 0 3.584 0 5.632-0.512h0.512c2.048-0.512 3.584-1.024 5.12-1.536h0.512c1.536-0.512 3.584-1.536 5.12-2.56h0.512c1.536-1.024 3.072-2.56 4.608-4.096l347.648-347.648c11.776-11.776 11.776-31.232 0-43.52-11.776-11.776-31.232-11.776-43.52 0L542.72 735.744V87.04c0-16.896-13.824-30.72-30.72-30.72s-30.72 13.824-30.72 30.72v648.704L185.856 440.832c-11.776-11.776-31.232-11.776-43.52 0-11.776 11.776-11.776 31.232 0 43.52l347.648 347.648zM925.696 901.12H98.304c-16.896 0-30.72 13.824-30.72 30.72s13.824 30.72 30.72 30.72h827.904c16.896 0 30.72-13.824 30.72-30.72s-14.336-30.72-31.232-30.72z" />
                      </svg>
                      下载
                    </div>
                  ) : null
                }
              </div>
              {
                baseSettings?.data?.showPage == 1 && ['pdf', 'docx'].includes(urlType) ? (
                  <div className="chat-text-robot-source-documents-file-page-number">
                    来源: {urlType.toUpperCase()} 文件第{metadata?.page_number}页
                  </div>
                ) : null
              }
            </div>
          )
        })
      }
    </div>
  )
}
