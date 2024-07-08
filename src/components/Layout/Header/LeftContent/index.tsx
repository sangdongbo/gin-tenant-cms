import classNames from 'classnames';
import { history, useLocation, useModel, Access, useAccess } from '@umijs/max';
import obtainAuthRoutes from '@/utils/obtainAuthRoutes';
import findNearestValidRoute from '@/utils/findNearestValidRoute';

import baseRoutes from '../../../../../config/routes/base';

import styles from './styles.less';
import { memo } from 'react';

const topMenu = () => {
  return baseRoutes.filter((item) => {
    if (item?.layout !== false && item?.hideInMenu !== true && (item?.component || item?.routes)) {
      return true;
    }
    return false;
  });
};

export default memo(() => {
  const { pathname } = useLocation();
  const access: any = useAccess();

  return (
    <div className={styles.content}>
      {topMenu()?.map((item: any, index: number) => {
        let accessible = true;
        if (item?.access && access[item?.access]) {
          accessible = access[item?.access]();
        }
        return (
          <Access accessible={!!accessible}>
            <div
              key={index}
              className={classNames(styles.same, {
                [styles['same-active']]: pathname.includes(item.path),
              })}
              onClick={() => {
                const routes = obtainAuthRoutes(access, item?.routes);
                const path = findNearestValidRoute(routes);
                history.push(path);
              }}
            >
              {item.name}
            </div>
          </Access>
        );
      })}
    </div>
  );
});
