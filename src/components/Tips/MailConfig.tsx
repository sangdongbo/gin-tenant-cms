import { useModel } from '@umijs/max';
import BaseCard from "./BaseCard";

const GoMailConfig = (props: any) => {
  const { initialState }: any = useModel('@@initialState');
  const mailCofing = initialState?.mailCofing || {};

  if (!mailCofing?.data?.host) return (<BaseCard
    text="请前往配置您的邮件信息"
    link="/settings/system/config/mail"
    btnText="前往配置"
  />);

  return props?.children;
};

export default GoMailConfig;
