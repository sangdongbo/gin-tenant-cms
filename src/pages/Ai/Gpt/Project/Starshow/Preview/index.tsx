import { useSearchParams } from '@umijs/max';
import { stringify } from 'qs';
import Preview from '../../components/Preview';

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');
  const urlQuery = {
    type: 'wechat',
    project: projectId,
    token: localStorage.getItem('lookstar-tenant-token'),
    tenant: localStorage.getItem('lookstar-tenant-X-Tenant'),
  };

  return (
    <Preview
      url={`${AI_URL}/gpt/preview-pc?${stringify(urlQuery)}`}
      bodyStyle={{
        width: "100%",
        maxWidth: 1250,
        height: window.innerHeight - 54,
        margin: '0 auto',
      }}
    />
  );
};
