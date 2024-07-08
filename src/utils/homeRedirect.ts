import obtainAuthRoutes from './obtainAuthRoutes';
import baseRoutes from '../../config/routes/base';
import access from '../access';
import findNearestValidRoute from './findNearestValidRoute';

const getHomeUrl = (userInfo: any) => {
  const routes = obtainAuthRoutes(access({ currentUser: userInfo }), baseRoutes);
  // 排除登陆页面路由
  routes.shift();
  const path = findNearestValidRoute(routes);
  return path || '/';
};

export default getHomeUrl;
