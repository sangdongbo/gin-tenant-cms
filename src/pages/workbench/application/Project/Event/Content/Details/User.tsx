import { useSearchParams, history } from '@umijs/max';
import { ArrowLeftOutlined } from '@ant-design/icons';
import User from '@/components/Project/Register/User';

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');
  const eventId: any = searchParams.get('event_id');

  return (
    <User
      projectId={projectId}
      params={{
        'filter[event_id]': eventId,
      }}
      exportParams={{
        'filter[event_id]': eventId,
      }}
      headerTitle={<ArrowLeftOutlined
        style={{ cursor: 'pointer' }}
        onClick={() => {
          history.push(`/workbench/application/project/event/basic/content?id=${projectId}&menu=list`);
        }}
      />}
    />
  );
};
