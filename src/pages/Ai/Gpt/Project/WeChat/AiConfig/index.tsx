import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from '@umijs/max';
import { Affix } from "antd";
import { useSize } from 'ahooks';
import { stringify } from 'qs';
import ProCard from '@/components/BaseComponents/ProCard';

import Base from './components/Base';
import Rule from './components/Rule';

const PreviewIframe = ({ style, iframeKey, ...props }: any) => {
  const domRef = useRef<HTMLDivElement>(null);
  const domSize = useSize(domRef);
  const [domFirstHeight, setDomFirstHeight] = useState<any>(0);

  useEffect(() => {
    if (domSize?.height && !domFirstHeight) {
      setDomFirstHeight(domSize?.height);
    }
  }, [domSize]);

  return (
    <div ref={domRef} style={style}>
      {
        domFirstHeight ? (
          <Affix>
            <iframe
              key={iframeKey}
              {...props}
              style={{
                width: '100%',
                height: domFirstHeight
              }}
            />
          </Affix>
        ) : null
      }
    </div>
  );
};

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');
  // 更新key值，强制重新渲染iframe
  const [iframeKey, setIframeKey] = useState(Date.now());

  const urlQuery = {
    type: 'wechat',
    project: projectId,
    token: localStorage.getItem('lookstar-tenant-token'),
    tenant: localStorage.getItem('lookstar-tenant-X-Tenant'),
  };

  return (
    <ProCard
      split="vertical"
      bordered
      bodyStyle={{ padding: 0 }}
    >
      <ProCard
        title="AI配置"
        colSpan="50%"
        tabs={{
          destroyInactiveTabPane: true,
          defaultActiveKey: 'knowledgeBase',
          type: 'line',
          tabPosition: 'left',
          cardProps: {
            bodyStyle: {
              padding: 0,
            },
          },
          items: [
            {
              label: '基础设置',
              key: 'base',
              children: <Base
                projectId={projectId}
                onFinish={() => {
                  setIframeKey(Date.now());
                }}
              />,
            },
            {
              label: '规则设置',
              key: 'rule',
              children: <Rule
                projectId={projectId}
                onFinish={() => {
                  setIframeKey(Date.now());
                }}
              />,
            },
          ],
          style: {
            minHeight: window.innerHeight - 240 - 54
          },
        }}
      />
      <ProCard title="预览" colSpan="50%" style={{ height: window.innerHeight - 240 }}>
        <PreviewIframe
          iframeKey={iframeKey}
          src={`${AI_URL}/gpt/preview-pc?${stringify(urlQuery)}`}
          frameBorder="0"
          style={{ width: '100%', height: '100%' }}
        />
      </ProCard>
    </ProCard>
  );
};
