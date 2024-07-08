import { Column } from '@ant-design/charts';
import { useEffect, useState } from 'react';

export default ({ request, params }: any) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    request(params).then(setData);
  }, [params]);

  return <Column data={data} xField="x" yField="y" />;
};
