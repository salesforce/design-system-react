import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Externalize React and any bare (node_modules) dependency — a component library
// should not bundle its deps. Relative/aliased source is kept in the build.
const external = (id: string) =>
	/^react($|\/)/.test(id) ||
	/^react-dom($|\/)/.test(id) ||
	(!id.startsWith('.') &&
		!id.startsWith('/') &&
		!id.startsWith('~') &&
		!id.startsWith('@components') &&
		!id.startsWith('@utilities') &&
		!id.startsWith('@types'));

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Force a single copy of React/ReactDOM. `react-highlighter-ts` declares
    // `react@^17` as a hard dependency (not a peer); a package.json `overrides`
    // entry pins it to the root React 19 so no nested copy is installed, and
    // deduping keeps a single React instance regardless.
    dedupe: ['react', 'react-dom'],
    alias: {
      '~': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@utilities': path.resolve(__dirname, './utilities'),
      '@types': path.resolve(__dirname, './types'),
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /design-tokens/],
      transformMixedEsModules: true,
    },
    lib: {
      // The barrel is the graph root; `preserveModules` (below) then emits every
      // reachable source module as its own file, mirroring the components/ tree,
      // so consumers can deep-import `@salesforce/design-system-react/components/
      // accordion` (and `.../accordion/panel`, etc.) as they always could.
      entry: path.resolve(__dirname, 'components/index.js'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external,
      output: [
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: '.',
          dir: 'dist/es',
          entryFileNames: '[name].js',
        },
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: '.',
          dir: 'dist/cjs',
          entryFileNames: '[name].cjs',
          exports: 'named',
        },
      ],
    },
    sourcemap: true,
  },
});
