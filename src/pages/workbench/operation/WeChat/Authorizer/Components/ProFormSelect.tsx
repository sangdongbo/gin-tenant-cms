import { ProFormSelect } from '@ant-design/pro-components';

import { useModel } from '@umijs/max';
// import { useEffect } from 'react';

export default ({ selectFirst, ...props }: any) => {
  // 因为已经请求了所以可以直接使用数据，无需请求了
  const { initialState } = useModel('@@initialState');
  const { authorizer }: any = initialState;

  return (
    <ProFormSelect
      initialValue={selectFirst ? authorizer[0].value : ''}
      {...props}
      options={authorizer}
    />
  );
};
