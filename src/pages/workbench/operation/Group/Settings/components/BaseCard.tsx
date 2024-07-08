import { ProCard } from '@/components/BaseComponents';
import type { ProCardProps } from '@ant-design/pro-components';

export default (props: ProCardProps) => {
  return (
    <ProCard
      headStyle={{
        padding: 0,
      }}
      bodyStyle={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
      {...props}
    >
      {props.children}
    </ProCard>
  );
};
