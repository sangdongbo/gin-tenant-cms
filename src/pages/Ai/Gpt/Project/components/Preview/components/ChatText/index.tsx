import React, { useEffect, useRef, useState, useContext } from 'react';
import { history, useModel } from 'umi';
import { chunk } from 'lodash';
import handleUint8Array from '@/utils/handleUint8Array';
import BaseSettingsContent from '../../BaseSettingsContent';
import Header from './Header';
import User from './User';
import Robot from './Robot';
import Send from './Send';

import Scroll from '@/components/Scroll/index';

import './index.less';

export default () => {
  const { baseSettings, projectId }: any = useContext(BaseSettingsContent);
  const contentRef = useRef<HTMLDivElement>(null);
  const chatDataRef = useRef<any>({});
  const showChatRef = useRef<any>();

  const scrollUlDom = useRef<HTMLUListElement>(null);
  const scrollRqDom = useRef<HTMLDivElement>(null);
  const thisScroll = useRef<any>(null);

  const historyListRef = useRef<any[]>([]);

  const [isSending, setIsSending] = useState(false);
  // 让页面渲染因为chatDataRef变化后不会重新渲染页面，只是让页面重新渲染的方法
  const [renderingNum, setRenderingNum] = useState(0);

  const getChatHistory = () => {
    const currentHistory = JSON.parse(JSON.stringify(historyListRef.current));
    currentHistory.shift();
    currentHistory.pop();
    currentHistory.pop();
    const newHistory = chunk(currentHistory, 2);

    return newHistory.map((item: any) => {
      return item.map((it: any) => {
        const { text } = handleUint8Array(it.content);
        return text;
      });
    });
  };

  const onSend = (value: any, notData?: boolean) => {
    if (!notData) {
      historyListRef.current = [
        ...historyListRef.current,
        {
          role: 'user',
          content: value,
        },
      ];
      historyListRef.current = [
        ...historyListRef.current,
        {
          role: 'assistant',
          content: '',
        },
      ];
    }
    setRenderingNum(-1);
    setIsSending(true);

    fetchChat({
      params: {
        message: value,
        chat_history: getChatHistory(),
        streaming: true,
      },
      onMessage(data: any) {
        chatDataRef.current = {
          content: `${chatDataRef.current?.content ? chatDataRef.current?.content + ',' : ''}${
            data.result || ''
          }`,
          source_documents: data.source_documents,
        };
      },
      onDone() {
        const clearDoneTimeout = setTimeout(() => {
          clearInterval(showChatRef.current);
          if (historyListRef.current[historyListRef.current.length - 1]) {
            historyListRef.current[historyListRef.current.length - 1].content =
              chatDataRef.current.content || '';
            historyListRef.current[historyListRef.current.length - 1].source_documents =
              chatDataRef.current.source_documents;
          }

          setRenderingNum(0);
          // 清空默认值
          chatDataRef.current = {};

          // 防止过快设置导致 useEffect 不触发
          setIsSending(false);
          clearTimeout(clearDoneTimeout);
        }, 500);
      },
      onError() {
        const clearDoneTimeout = setTimeout(() => {
          clearInterval(showChatRef.current);
          if (historyListRef.current[historyListRef.current.length - 1]) {
            historyListRef.current[historyListRef.current.length - 1].error = 1;
            historyListRef.current[historyListRef.current.length - 1].retryMessage = value;
          }

          setRenderingNum(0);
          // 清空默认值
          chatDataRef.current = {};

          // 防止过快设置导致 useEffect 不触发
          setIsSending(false);
          clearTimeout(clearDoneTimeout);
        }, 500);
      },
    });
  };

  const fetchChat = async ({ params, onMessage, onDone, onError }: any) => {
    const response: any = await fetch(`${API_URL}/tenant/ai/gpt/conversation`, {
      method: 'POST',
      body: JSON.stringify({
        ...params,
        project_id: projectId,
        openid: localStorage.getItem('openid') || '',
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant': localStorage.getItem('lookstar-tenant-X-Tenant'),
      },
    });

    if (response.status < 200 || response.status >= 300) {
      onError?.();
      return;
    }

    const reader = response.body.getReader();
    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        onDone?.();
        break;
      }
      onMessage?.({
        result: value,
      });
    }
  };

  // 定位到底部
  const scrollToBottom = (_time: number) => {
    const scrollRqDomHeight = scrollRqDom.current?.clientHeight || 0;
    const _clientHeight = scrollUlDom.current?.clientHeight || 0;
    const _scrollTo = _clientHeight - scrollRqDomHeight;

    if (_scrollTo > 0) {
      thisScroll.current?.scrollTo(0, _scrollTo * -1, _time ? _time : 0);
    }
  };

  // 模拟机器人提问
  useEffect(() => {
    if (baseSettings?.description) {
      setRenderingNum(-1);
      setTimeout(() => {
        // 因为机器人是流逝输出，所以需要转为二进制
        const textEncoder = new TextEncoder();
        historyListRef.current = [
          {
            role: 'assistant',
            content: textEncoder.encode(baseSettings?.description).join(','),
            preset_question: baseSettings?.preset_question || [],
          },
        ];
        setRenderingNum(0);
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (isSending) {
      showChatRef.current = setInterval(() => {
        // 给list设置数据
        historyListRef.current[historyListRef.current.length - 1].content =
          chatDataRef.current.content || '';
        historyListRef.current[historyListRef.current.length - 1].source_documents =
          chatDataRef.current.source_documents;
        setRenderingNum((value) => value + 1);
      }, 300);
    }
  }, [isSending]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom(0);
    }, 0);
  }, [renderingNum]);

  return (
    <div className="chat-text">
      <Header />
      <div className="chat-text-content">
        <div style={{ width: '100%', height: '100%', position: 'relative' }} ref={scrollRqDom}>
          <Scroll
            click
            scrollbar={false}
            isPullUpTipHide={true}
            refFun={(_scroll: any) => {
              thisScroll.current = _scroll;
            }}
          >
            <ul className="chat-text-content-rq" ref={scrollUlDom}>
              <li className="chat-text-content-rq-zw" />
              {historyListRef.current?.map((item: any, index: number) => {
                return (
                  <li key={index}>
                    {item.role == 'user' ? <User content={item.content} /> : null}
                    {item.role == 'assistant' ? (
                      <Robot
                        {...item}
                        preset_question={item.preset_question}
                        error={index == historyListRef.current.length - 1 ? item.error : false}
                        sending={index == historyListRef.current.length - 1 ? isSending : false}
                        showReferences={baseSettings.data?.showReferences}
                        onRetry={() => {
                          onSend(item?.retryMessage, true);
                          if (historyListRef.current[historyListRef.current.length - 1]) {
                            delete historyListRef.current[historyListRef.current.length - 1].error;
                            delete historyListRef.current[historyListRef.current.length - 1]
                              .retryMessage;
                          }
                        }}
                        onPresetQuestions={(it: any) => {
                          if (isSending) return;
                          onSend(it?.title);
                        }}
                      />
                    ) : null}
                  </li>
                );
              })}
              <li className="chat-text-content-rq-zw2" />
              {/* <li>
                <SafeArea position='bottom' />
              </li> */}
            </ul>
          </Scroll>
        </div>
      </div>
      <Send disabled={isSending} onSend={onSend} />
    </div>
  );
};
