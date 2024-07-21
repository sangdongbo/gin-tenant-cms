import { defineConfig } from '@umijs/max';
import proxy from './proxy';

const isBeta = process.env.UMI_ENV === 'beta';

export default defineConfig({
  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:8888',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  define: {
    API_URL: 'http://localhost:8847/api',
    MICROBOOK_URL: 'https://clould-app.lookstar.com.cn/microbook-beta',
    DATA_DOWNLOAD_URL: 'https://clould-app.lookstar.com.cn/data-download-beta',
    AI_URL: 'https://clould-app.lookstar.com.cn/ai-beta',
    ACTIVITY_CENTER: 'https://clould-app.lookstar.com.cn/activity-center-beta',
  },
});
