import { useEffect, useRef, useState } from 'react';
import { history } from '@umijs/max';
import ApplicationCard from './ApplicationCard';
import { getHubSpotRule } from '../../service';

export default () => {
  const [hubspot, setHubspot] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const judgeClosePage = useRef<any>(null);

  const reload = () => {
    setLoading(true);
    getHubSpotRule().then((result) => {
      setHubspot(result);
      setLoading(false);
    });
  };

  const onAccess = () => {
    const redirectUri = `https://app.lookstar.com.cn/tenant/hubspot/oauth-callback`;
    const openRef = window.open(
      `https://app.hubspot.com/oauth/authorize?client_id=8816418a-fa14-4181-9687-d48fdc74f641&redirect_uri=${redirectUri}&scope=crm.objects.contacts.write%20crm.objects.marketing_events.write%20crm.objects.custom.write%20crm.objects.companies.write%20crm.lists.write%20crm.objects.deals.write%20crm.schemas.companies.write%20crm.schemas.contacts.write%20crm.schemas.deals.write%20crm.objects.quotes.write%20crm.objects.line_items.write`,
      '_blank',
      'width=1000,height=800,menubar=no,toolbar=no,status=no,scrollbars=yes',
    );
    judgeClosePage.current = setInterval(() => {
      if (openRef && openRef.closed) {
        reload();
        clearInterval(judgeClosePage.current);
      }
    }, 300);
  };

  useEffect(() => {
    reload();

    return () => {
      clearInterval(judgeClosePage.current);
    };
  }, []);

  return (
    <ApplicationCard
      loading={loading}
      logo="https://lookstar.oss-cn-beijing.aliyuncs.com/tenant/static/img/hubspot-logo.png"
      title="HubSpot"
      showSetting={hubspot?.data}
      briefIntroduction="一键连接您的HubSpot，实现在HubSpot CRM中管理来自测试的销售线索，利用HubSpot Marketing/Sale Hub实现一站式销售管理。"
      onSetting={() => history.push('/settings/system/config/apps/hubspot')}
      onAccess={onAccess}
    />
  );
};
