import { useState, useRef, useEffect } from 'react';
import { history, useSearchParams } from '@umijs/max';
import { Spin } from 'antd';
import { addContactsFieldsRule, getContactsFieldsRule } from '../service';

export default () => {
  // 表单手机号默认保存数据（其他字段后台会自动补充）
  const defaultContactsFields: any = [
    {
      "form_type": "text",
      "name": "full_name",
      "label": "姓名",
      "required": 1,
    },
    {
      "rule_name": "regexp_ch_code_phone",
      "form_type": "text",
      "name": "phone",
      "label": "手机号",
      "required": 1,
    },
    {
      "type": "system",
      "form_type": "text",
      "name": "email",
      "label": "邮箱",
      "required": 1,
      "rule_name": "regexp_email",
    },
    {
      "type": "system",
      "form_type": "text",
      "name": "job",
      "label": "职务",
      "required": 1,
    },
    {
      "type": "system",
      "form_type": "text",
      "name": "company",
      "label": "公司",
      "required": 1,
    },
    {
      "type": "system",
      "form_type": "text",
      "name": "industry",
      "label": "行业",
      "required": 1,
    },
  ];

  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoad, setIframeLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const goBack = (projectId: any, e: any) => {
    if (e.data == 'onGoBack') {
      history.push(`/workbench/material/forms/basic/settings?id=${projectId}`);
    }
  };

  useEffect(() => {
    setLoading(true);
    // 进入页面判断当前是否有数据，没有数据先保存一次手机号。因为手机号是必有字段。
    getContactsFieldsRule({
      'filter[forms_id]': projectId
    }).then(res => {
      if (res?.length == 0) {
        addContactsFieldsRule({
          forms_id: projectId,
          data: defaultContactsFields,
        }).then(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      };
    });
  }, []);

  useEffect(() => {
    if (iframeLoad) window.addEventListener('message', (val) => goBack(projectId, val));
    return () => {
      window.removeEventListener("message", (val) => goBack(projectId, val));
    };
  }, [iframeLoad]);

  return (
    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%' }}>
      {
        loading ? (
          <Spin size="large">
            <div style={{ width: '100%', height: '60vh' }} />
          </Spin>
        ) :
          <iframe
            ref={iframeRef}
            style={{ width: '100%', height: '100%' }}
            src={`https://landing-release.lookstar.com.cn/landing/new-landing-forms${REACT_APP_ENV == 'beta' ? '-beta' : ''}?${REACT_APP_ENV == 'beta' ? 'beta=1&' : ''}id=${projectId}&token=${localStorage.getItem('lookstar-tenant-token')}&tenant=${localStorage.getItem('lookstar-tenant-X-Tenant')}`}
            // src={`http://localhost:8001/landing/new-landing${REACT_APP_ENV == 'beta' ? '-beta' : ''}/forms?${REACT_APP_ENV == 'beta' ? 'beta=1&' : ''}debug=1&id=${projectId}&token=${localStorage.getItem('lookstar-tenant-token')}&tenant=${localStorage.getItem('lookstar-tenant-X-Tenant')}`}
            frameBorder="0"
            onLoad={() => {
              setIframeLoad(true);
            }}
          />
      }
    </div>
  )
}
