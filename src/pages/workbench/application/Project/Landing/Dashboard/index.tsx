import { useSearchParams } from '@umijs/max';
import ProRow from '@/components/BaseComponents/ProRow';
import Channel from '../../components/Channel';

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  return (
    <ProRow style={{ paddingTop: 8 }} gutter={[16, 16]}>
      <ProRow.Col span={12}>
        <Channel
          title="浏览渠道占比"
          params={{
            app_id: projectId,
            event: '$pageview'
          }}
          centerTitle="浏览"
        />
      </ProRow.Col>
      <ProRow.Col span={12}>
        <Channel
          title="注册渠道占比"
          params={{
            app_id: projectId,
            event: 'user_register_success'
          }}
          centerTitle="注册"
        />
      </ProRow.Col>
    </ProRow>
  );
};
