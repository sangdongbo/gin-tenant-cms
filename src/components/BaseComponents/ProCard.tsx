import { ProCard as BaseProCard } from '@ant-design/pro-components';
import type { ProCardProps } from '@ant-design/pro-components';
import classnames from 'classnames';
import style from './style.less';
interface PropsType extends ProCardProps {
  hiddenPaddingTop?: boolean; // 隐藏顶部距离
  hiddenPadding?: boolean; // 隐藏pandding
}

const ProCard = ({ children, hiddenPaddingTop, hiddenPadding, ...props }: PropsType) => {
  return (
    <BaseProCard
      className={classnames({
        [style['pro-card-hidden-padding-top']]: hiddenPaddingTop,
        [style['pro-card-hidden-padding']]: hiddenPadding,
        'reset-pro-card': true,
        'hidden-tabs-top': true,
      })}
      headStyle={{
        padding: '14px 20px'
      }}
      bodyStyle={{
        padding: '14px 20px',
      }}
      {...props}
    >
      {children}
    </BaseProCard>
  );
};

ProCard.TabPane = BaseProCard.TabPane;
ProCard.isProCard = true;

export default ProCard;
