import { useSearchParams } from '@umijs/max';
import User from '../components/Register/User';

export default (props: any) => {
  const [searchParams] = useSearchParams();
  const formsId: any = searchParams.get('id');

  return (
    <div>
      <User formsId={formsId} />
    </div>
  );
};
