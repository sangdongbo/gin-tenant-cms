// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import define from './define';
import routes from './routes';
import theme from './theme';
import scripts from './scripts';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  // // 本地使用二维码下载图片需要https协议才可下载成功
  // https: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  proxy,
  scripts,
  routes,
  theme,
  /**
   * @name moment 的国际化配置
   * @description 如果对国际化没有要求，打开之后能减少js的包大小
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @name 快速热更新配置
   * @description 一个不错的热更新组件，更新时可以保留 state
   */
  fastRefresh: true,
  /**
   * @name moment2dayjs 插件
   * @description 将项目中的 moment 替换为 dayjs
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  antd: {
    theme: {
      token: theme,
      // components: {
      //   Card: {
      //     borderRadiusLG: 20,
      //   },
      // },
    },
  },
  // locale: false,
  layout: {
    title: '测试',
    ...defaultSettings,
  },
  define: {
    ...define,
    API_URL: 'https://127.0.0.1:8000',
    AI_API: 'https://ai.lookstar.com.cn',
    MICROBOOK_URL: 'https://clould-app.lookstar.com.cn/microbook',
    DATA_DOWNLOAD_URL: 'https://clould-app.lookstar.com.cn/data-download',
    AI_URL: 'https://clould-app.lookstar.com.cn/ai',
    ACTIVITY_CENTER: 'https://clould-app.lookstar.com.cn/activity-center',
    REACT_APP_ENV: REACT_APP_ENV || false,
  },
  base: '/tenant',
  publicPath: '/tenant/',

  mfsu: false,
  esbuildMinifyIIFE: true,
});
