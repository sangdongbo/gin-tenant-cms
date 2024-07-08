// import { ProCard } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';

import SMS from './components/SMS';

export default () => {
  return (
    <ProCard
      tabs={{
        type: 'line',
        items: [
          {
            label: '短信配置',
            key: 'sms',
            children: <SMS />,
          },
        ]
      }}
    />
  );
};
