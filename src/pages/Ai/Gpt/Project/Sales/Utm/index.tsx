import { useSearchParams } from '@umijs/max';
import Table from '@/components/Utm/Table';

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  return (
    <Table
      headerTitle={false}
      projectId={projectId}
      params={{
        'filter[type]': 'gpt',
      }}
      addParams={{
        type: 'gpt',
      }}
      url={`${AI_URL}/gpt/sales?tenant=${localStorage.getItem('lookstar-tenant-X-Tenant')}&project=${projectId}`}
    />
  );
};
