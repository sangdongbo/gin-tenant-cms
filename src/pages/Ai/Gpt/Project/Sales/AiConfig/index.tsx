import { useSearchParams } from '@umijs/max';
import ProCard from '@/components/BaseComponents/ProCard';

import Base from './components/Base';
import Rule from './components/Rule';

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
            label: '基础设置',
            key: 'base',
            children: <Base projectId={projectId} />,
          },
          {
            label: '规则设置',
            key: 'rule',
            children: <Rule projectId={projectId} />,
          },
        ],
      }}
    />
  );
};
