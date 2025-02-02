/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  beta: {
    '/api/': {
      target: 'http://127.0.0.1:8888',
      changeOrigin: true,
      pathRewrite: { '^': '' }, // 保留 /api 前缀
    }
  },
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/central/': {
      // 要代理的地址
      //   target: 'https://api.lookstar.com.cn',
      target: 'http://127.0.0.1:8888',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/': {
      target: 'http://127.0.0.1:8888',
      changeOrigin: true,
      pathRewrite: { '^': '' }, // 保留 /api 前缀
    },
    // '/tenant/': {
    //   // 要代理的地址
    //   target: 'https://api.lookstar.com.cn',
    //   // target: 'http://127.0.0.1:8000',
    //   // 配置了这个可以从 http 代理到 https
    //   // 依赖 origin 的功能可能需要这个，比如 cookie
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
    // '/tenant/project/dashboard/': {
    //   // 要代理的地址
    //   //   target: 'https://api.lookstar.com.cn',
    //   target: 'http://192.168.1.42:81',
    //   // 配置了这个可以从 http 代理到 https
    //   // 依赖 origin 的功能可能需要这个，比如 cookie
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
