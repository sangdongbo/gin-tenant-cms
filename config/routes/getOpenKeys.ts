/**
 * 因为使用了 splitMenus: true 导致defaultOpenAll失效暂无官方解决方案：[issues](https://github.com/ant-design/pro-components/issues/2569)
*/
import routes from "./index";

const getOpenKeys = () => {
  let openKeys: any[] = [];
  routes?.map(item => {
    if (item.routes) {
      item.routes.map(it => {
        openKeys.push(it.path);
      });
    };
  });
  return openKeys;
}

export default getOpenKeys;
