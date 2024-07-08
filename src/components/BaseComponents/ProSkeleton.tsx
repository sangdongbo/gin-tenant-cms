import { Skeleton } from 'antd';

export default ({ spinning, children }: any) => {
  if (spinning) return <Skeleton active />;
  return children;
}
