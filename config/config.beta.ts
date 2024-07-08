// https://umijs.org/config/
import { defineConfig } from '@umijs/max';

export default defineConfig({
  define: {
    API_URL: 'http://127.0.0.1:8888',
    // API_URL: 'https://beta-api.lookstar.com.cn',
    MICROBOOK_URL: 'https://clould-app.lookstar.com.cn/microbook-beta',
    DATA_DOWNLOAD_URL: 'https://clould-app.lookstar.com.cn/data-download-beta',
    AI_URL: 'https://clould-app.lookstar.com.cn/ai-beta',
    ACTIVITY_CENTER: 'https://clould-app.lookstar.com.cn/activity-center-beta',
  },
});
