import { useSearchParams } from '@umijs/max';
import ProCard from '@/components/BaseComponents/ProCard';
import OfficialAccountArticle from '../../../components/OfficialAccountArticle';
import CustomUpload from '../../../components/CustomUpload';
import Create from '../../../../Knowledge/Create';
export default () => {
  const [searchParams] = useSearchParams();
  const projectId: any = searchParams.get('id');

  return (
    <ProCard
      tabs={{
        destroyInactiveTabPane: true,
        defaultActiveKey: 'customUpload',
        type: 'line',
        cardProps: {
          bodyStyle: {
            padding: 0,
          },
        },
        items: [

          {
            label: '上传资料',
            key: 'customUpload',
            children: (
              <CustomUpload
                projectId={projectId}
                fieldProps={{
                  showDownload: true,
                }}
              />
            ),
          },
          {
            label: '创建资料',
            key: 'customCreate',
            children: <Create projectId={projectId} />,
          },
          {
            label: '公众号文章',
            key: 'officialAccountArticle',
            children: <OfficialAccountArticle projectId={projectId} />,
          },
        ],
      }}
    />
  );
};
