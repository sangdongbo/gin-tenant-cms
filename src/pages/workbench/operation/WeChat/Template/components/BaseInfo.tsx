// import { ProCard } from '@/components/BaseComponents';
import type { ProCardProps, ProFormProps } from '@ant-design/pro-components';
import BaseCard from '@/pages/workbench/operation/Group/Settings/components/BaseCard';
import Form from './Form';

export interface PropsType extends ProFormProps {
  initialValues?: any;
  cardProps?: ProCardProps;
  title?: string;
}

export default ({ title = '基础设置', cardProps, ...props }: PropsType) => {

  return (
    <BaseCard
      title={title}
      {...cardProps}
    >
      <Form {...props} />
    </BaseCard>
  );
};
