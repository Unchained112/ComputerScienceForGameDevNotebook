import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// GitHub Pages 部署：site 为站点根域名，base 为仓库名对应的子路径
export default defineConfig({
  site: 'https://Unchained112.github.io',
  base: '/ComputerScienceForGameDevNotebook',
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
