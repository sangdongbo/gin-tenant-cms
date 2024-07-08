import { ProCard } from '@/components/BaseComponents';
import { Settings, Verification } from './components';

export default () => {
  return (
    <ProCard
      tabs={{
        defaultActiveKey: 'content',
        type: 'line',
        destroyInactiveTabPane: true,
        cardProps: {
          bodyStyle: {
            padding: 0,
          },
        },
        items: [
          {
            label: '字段设置',
            key: 'content',
            children: <Settings />,
          },
          {
            label: '字段验证规则',
            key: 'style',
            children: <Verification />,
          }
        ]
      }}
    />
  );
};
