/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import { envSchema } from './src/utils/validations/env.schema';


export default defineConfig(({ mode }) => {
  envSchema.validateSync({ mode }, { strict: true });

  return {
    publicDir: 'public',
    envPrefix: 'VITE_',
    outDir: 'dist',
    envDir: process.cwd(),
    server: {
      port: 4096,
      host: '0.0.0.0',
      open: '#debug',
    },
    resolve: {
      alias: {
        '@': process.cwd(),
      },
    },
    base: './',
    build: {
      chunkSizeWarningLimit: 700,
      reportCompressedSize: true,
      sourcemap: true,
      assetsDir: '.',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: 'index.html',
        },
      },
    },
    plugins: [react()],
    test: {
      setupFiles: ['./tests/unit/__setup__/setup.ts'],
      globals: true,
      environment: 'jsdom',
      coverage: {
        all: true,
        provider: 'v8',
        reporter: ['cobertura', 'text', 'html'],
        exclude: ['*.cjs', '*.config.*', 'dist/**', 'src/**.d.ts', 'tests'],
      },
    },
  };
});
