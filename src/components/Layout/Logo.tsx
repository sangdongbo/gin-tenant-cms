import styles from './styles.less';
import { history, useModel } from '@umijs/max';
import homeRedirect from '@/utils/homeRedirect';

export default () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const handleLogoClick = (e: any) => {
    e.stopPropagation();
    const redirectUrl = homeRedirect(currentUser);
    history.push(redirectUrl);
  };

  return (
    <div className={styles['menu-header-logo']} onClick={handleLogoClick}>
      <img
        src="https://lookstar-landing.oss-cn-beijing.aliyuncs.com/uploads/tenant/landing/202202/rc-upload-1645671333028-2.png"
        alt="logo"
      />
      <span>测试</span>
    </div>
  );
};
