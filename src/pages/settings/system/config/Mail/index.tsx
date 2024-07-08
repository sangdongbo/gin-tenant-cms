// import { ProCard } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';

import Mail from './components/Mail';

export default () => {
  return (
    <ProCard
      tabs={{
        type: 'line',
        items: [
          {
            label: '邮箱配置',
            key: 'mail',
            children: <Mail />,
          },
          // {
          //   label: 'SMS配置',
          //   key: 'sms',
          //   // children: <Verification />,
          // }
        ]
      }}
    />
    // <>
    //   <ProCard
    //     tabs={{
    //       type: 'line',
    //       items: [
    //         {
    //           label: '邮箱配置',
    //           key: 'mail',
    //           children: <Mail />,
    //         },
    //         {
    //           label: '字段验证规则',
    //           key: 'style',
    //           children: < Verification />,
    //         }
    //       ]
    //     }}
    //   >
    //   {/* <ProCard.TabPane key="user" tab="邮箱配置" style={{ padding: '16px 24px' }}>
    //       <Mail />
    //     </ProCard.TabPane>
    //   </ProCard> */}
    // </>
  );
};
