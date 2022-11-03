import { resolve } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    solidPlugin(),
    dts(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      fileName: 'index',
      formats: ['cjs', 'es']
    },
    rollupOptions: {
      external: Object.keys(pkg.dependencies)
    }
  },
});
