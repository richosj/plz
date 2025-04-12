// vite.config.mjs
import glob from 'fast-glob'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import ViteRestart from 'vite-plugin-restart'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isGhPages = mode === 'ghpages'
  const isLocalBuild = mode === 'localbuild'
  const projectName = 'exc-firstmove'

  return {
    root: 'src',
    base: isGhPages
    ? '/'+projectName+'/'
    : isLocalBuild
    ? ''
    : '/',
    publicDir: '../public',
    build: {
      outDir: isGhPages ? '../dist' : isLocalBuild ? '../build' : '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: Object.fromEntries(
          glob.sync('src/pages/*.html').map(file => {
            const name = path.basename(file, '.html')
            return [name, path.resolve(__dirname, file)]
          })
        ),
        output: {
          entryFileNames: 'assets/js/[name].js',
          assetFileNames: ({ name }) => {
            if (name && name.endsWith('.css')) return 'assets/css/style.css';
            return 'assets/[name]';
          }
        }
      },
      minify: isLocalBuild ? false : 'esbuild'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: (content, filename) => {
    //         const imagePath =
    //           mode === 'localbuild'
    //             ? '../images'
    //             : '/assets/images';
    //         return `$image-path: '${imagePath}';\n${content}`;
    //       }
          
    //     },
    //   },
    // },
    server: {
      watch: {
        ignored: ['!**/src/**', '!**/public/**'],
      },
    },
    plugins: [
      handlebars({
        partialDirectory: path.resolve(__dirname, 'src/components'),
      }),
      ViteRestart({
        restart: ['vite.config.mjs', 'src/scss/reset.scss'],
      }),
    ],
  }
})
