import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// base 随部署目标切换，保证两套部署都兼容：
// - GitHub Pages 子路径：默认（不设 DEPLOY_TARGET）→ /ComputerScienceForGameDevNotebook
// - CloudBase 静态托管根域名：构建时注入 DEPLOY_TARGET=cloudbase → /
// 代码内部全部走 import.meta.env.BASE_URL / withBase()，无需改动业务逻辑
const isCloudBase = process.env.DEPLOY_TARGET === 'cloudbase';
export default defineConfig({
  site: 'https://Unchained112.github.io',
  base: isCloudBase ? '/' : '/ComputerScienceForGameDevNotebook',
  integrations: [tailwind()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          // 将 three 等大依赖拆分为独立 chunk，避免阻塞首屏
          manualChunks: {
            three: ['three'],
          },
        },
      },
    },
  },
});
