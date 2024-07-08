// import { ProCard } from '@ant-design/pro-components';
import ProCard from '@/components/BaseComponents/ProCard';

export default (props: any) => {
  return (
    <ProCard ghost {...props}>
      {props.children}
    </ProCard>
  );
};
