import { useState, useRef, useEffect } from 'react';
import { history, useSearchParams } from '@umijs/max';
import { Spin } from 'antd';

import SelectTemplates from './components/SelectTemplates';

import { getEditRuntimeRule, addEditRuntimeRule } from '../service';

const templateJson: any = {
  1: require('./template1.json'),
  2: require('./template2.json'),
};

const goBack = (projectId: any, e: any) => {
  // const [searchParams] = useSearchParams();
  // const projectId: number = searchParams.get('id');
  if (e.data == 'onGoBack') {
    history.push(`/workbench/application/project/landing/basic/settings?id=${projectId}`);
  }
};

export default (props: any) => {
  // const query = parse(history.location.search);
  const [searchParams] = useSearchParams();
  const projectId: number = searchParams.get('id');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // const { project } = useModel('project', (model) => model);

  const [iframeLoad, setIframeLoad] = useState(false);
  // 设置模版默认值
  const [template, setTemplate] = useState<any>();

  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    setLoading(true);
    getEditRuntimeRule(projectId).then((res) => {
      setLoading(false);
      if (res?.template_id) {
        setTemplate({
          id: res?.template_id,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (iframeLoad) window.addEventListener('message', (val) => goBack(projectId, val));
    return () => {
      window.removeEventListener('message', (val) => goBack(projectId, val));
    };
  }, [iframeLoad]);

  return (
    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%' }}>
      {loading ? (
        <Spin size="large">
          <div style={{ width: '100%', height: '60vh' }} />
        </Spin>
      ) : (
        <>
          {template ? (
            <iframe
              ref={iframeRef}
              style={{ width: '100%', height: '100%' }}
              src={`https://landing-release.lookstar.com.cn/landing/new-landing${
                REACT_APP_ENV == 'beta' ? '-beta' : ''
              }?${REACT_APP_ENV == 'beta' ? 'beta=1&' : ''}templateid=${
                template.id
              }&id=${projectId}&token=${localStorage.getItem(
                'lookstar-tenant-token',
              )}&tenant=${localStorage.getItem('lookstar-tenant-X-Tenant')}`}
              // src={`http://192.168.1.130:8000/landing/new-landing${REACT_APP_ENV == 'beta' ? '-beta' : ''}?${REACT_APP_ENV == 'beta' ? 'beta=1&' : ''}debug=1&templateid=${template.id}&id=${projectId}&token=${localStorage.getItem('lookstar-tenant-token')}&tenant=${localStorage.getItem('lookstar-tenant-X-Tenant')}`}
              frameBorder="0"
              onLoad={() => {
                setIframeLoad(true);
              }}
            />
          ) : (
            <SelectTemplates
              onSelect={async (item: any) => {
                const projectSchema = templateJson[item.id];
                await addEditRuntimeRule({
                  project_id: projectId || '',
                  template_id: item.id || '',
                  data: {
                    schema: projectSchema,
                    ispublish: 0,
                  },
                });
                setTemplate(item);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};
