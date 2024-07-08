import React from 'react';
import { PageHeader } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { ProMobilePreview } from '@/components/BaseComponents';

import './index.less';

export default () => {
  const [searchParams] = useSearchParams();
  const pageUrl: any = searchParams.get('pageUrl');

  return <div className="preview-pc-page">
    <PageHeader
      onBack={() => null}
      backIcon={null}
      title="页面预览"
      style={{ height: 64, padding: '11px 24px' }}
    />
    <ProMobilePreview
      url={decodeURIComponent(pageUrl)}
    />
  </div>
}
