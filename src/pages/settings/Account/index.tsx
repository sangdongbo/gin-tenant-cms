import { ProCard } from '@ant-design/pro-components';

import Basic from './Basic';
import Security from './Security';
export default () => {
  return (
    <ProCard split="vertical" bordered headerBordered>
      <ProCard colSpan="50%">
        <Basic />
      </ProCard>
      <ProCard>
        <Security />
      </ProCard>
    </ProCard>
  );
};
