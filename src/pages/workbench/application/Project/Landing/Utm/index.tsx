import { useState, useEffect } from 'react';
import { useSearchParams } from '@umijs/max';

import { Table } from '@/components/Utm';

import { queryBasicRule } from '../../service';


export default (props: any) => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('id');
  const [details, setDetails] = useState<any>();

  useEffect(() => {
    queryBasicRule(projectId).then((res: any) => {
      setDetails(res);
    });
  }, []);

  return (
    <>
      <Table
        projectId={projectId}
        url={`https://landing-release.lookstar.com.cn/pages/${details?.uuid}`}
      />
    </>
  );
};
