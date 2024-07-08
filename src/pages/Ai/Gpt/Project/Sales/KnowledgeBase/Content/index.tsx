import { useSearchParams } from '@umijs/max';
import ProCard from '@/components/BaseComponents/ProCard';
import OfficialAccountArticle from '../../../components/OfficialAccountArticle';
import CustomUpload from '../../../components/CustomUpload';

export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  return (
    <ProCard
      tabs={{
        destroyInactiveTabPane: true,
        defaultActiveKey: 'knowledgeBase',
        type: 'line',
        cardProps: {
          bodyStyle: {
            padding: 0,
          },
        },
        items: [
          {
            label: '公众号文章',
            key: 'officialAccountArticle',
            children: <OfficialAccountArticle projectId={projectId} />,
          },
          {
            label: '自定义上传',
            key: 'customUpload',
            children: <CustomUpload projectId={projectId} />,
          }
        ]
      }}
    />
  )
}
