import { useSearchParams, history } from '@umijs/max';
// import User from '../../components/Register/User';
import User from '@/components/Project/Register/User';

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  return (
    <User
      projectId={projectId}
      headerTitle={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          注册用户
          <div
            style={{ marginLeft: 8, fontSize: 14, cursor: 'pointer', fontWeight: 'normal', whiteSpace: 'nowrap', color: '#0bc7ff' }}
            onClick={() => history.push(`/workbench/application/project/data-download/data/user/email-config?id=${projectId}`)}
          >
            设置通知
          </div>
        </div>
      }
    />
  );
};
