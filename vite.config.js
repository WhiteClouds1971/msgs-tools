import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          {
            '@/util/defineModel.js': ['useDefineModel'],
          },
        ],
        resolvers: [VantResolver()],
      }),
      Components({ resolvers: [VantResolver()] }),
    ],
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'), // 设置别名
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 9455,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.APP_SERVER_URL,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, '/api'),
        },
      },
    },
  };
});
