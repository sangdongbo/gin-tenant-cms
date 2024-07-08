import { useSearchParams } from '@umijs/max';

import { Table } from '@/components/Utm';

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  return (
    <>
      <Table
        projectId={projectId}
        url={`${DATA_DOWNLOAD_URL}?tenant=${localStorage.getItem('lookstar-tenant-X-Tenant',)}&project=${projectId}`}
      />
    </>
  );
};
