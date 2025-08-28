import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
  esbuild: {
    // Tell Vite to parse .js files as JSX
    loader: 'jsx',
    include: /src\/.*\.js$/, // All .js files in src/
    exclude: [],
  },
});
