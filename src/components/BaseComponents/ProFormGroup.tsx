import { ProForm } from '@ant-design/pro-components';
import ProTitle from './ProTitle';

export const handleTooltip = (title: string) => {
  return {
    placement: 'right',
    title: <div style={{ color: '#000' }}>{title}</div>,
    color: '#fff',
  };
};

export default ({ children, title, tooltip, ...props }: any) => {
  return (
    <ProForm.Group {...props} title={<ProTitle title={title} tooltip={tooltip} />}>
      {children}
    </ProForm.Group>
  );
};
