import { useSearchParams } from '@umijs/max';
import Question from '@/components/Project/Gpt/Question';
import { queryListRule } from './service';

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  return (
    <Question
      params={{
        project_id: projectId,
      }}
      pagination={{
        pageSize: 10,
      }}
      request={queryListRule}
    />
  );
};
