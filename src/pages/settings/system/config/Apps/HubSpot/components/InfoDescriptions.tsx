import { ProDescriptions } from '@ant-design/pro-components';
// import React from 'react';
// import { getHubSpotRule } from '../../../service';
export default (props: any) => {
  return (
    <ProDescriptions
      // request={getHubSpotRule}
      columns={[
        {
          title: 'AppID',
          dataIndex: 'app_id',
        },
        {
          title: 'HubDomain',
          dataIndex: 'hub_domain',
        },
        {
          title: 'HubID',
          dataIndex: 'hub_id',
        },
        {
          title: 'User',
          dataIndex: 'user',
        },
        {
          title: 'UserID',
          dataIndex: 'user_id',
        },
      ]}
      {...props}
    />
  );
};
