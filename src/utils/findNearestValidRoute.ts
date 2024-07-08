function findNearestValidRoute(routes: any[]) {
  for (let route of routes) {
    // 如果当前路由有效（有component），则返回其路径
    if ('component' in route) {
      return route.path;
    }

    // 如果有子路由，递归搜索子路由
    if ('routes' in route) {
      const childPath: any = findNearestValidRoute(route.routes);
      if (childPath) {
        return childPath;
      }
    }
  }
  return undefined;
}

export default findNearestValidRoute;
