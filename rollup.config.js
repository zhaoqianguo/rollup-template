import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs' // 让 Rollup 能够导入 cmj 模块
import resolve from '@rollup/plugin-node-resolve' // 让 Rollup 找到外部模块
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript' // 解析ts
import html from '@rollup/plugin-html' // html 静态模板
import scss from 'rollup-plugin-scss'
import terser from '@rollup/plugin-terser' // 压缩打包代码
import serve from 'rollup-plugin-serve' // rollup 开发服务器
import livereload from 'rollup-plugin-livereload' // 热更新

const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
const extensions = ['.js', '.ts', '.tsx']

// 返回文件的绝对路径
const resolveFile = function (filename) {
  return path.join(__dirname, filename)
}

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.js',
    format: 'iife'
  },
  plugins: [
    typescript(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(
        isProd ? 'production' : 'development'
      )
    }),
    resolve({
      extensions
    }),
    commonjs({
      include: /node_modules/
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**'
    }),
    html({
      fileName: 'index.html',
      title: 'Rollup + TypeScript + React = ❤️',
      template: ({ title }) => {
        return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>${title}</title>
            <link rel="stylesheet" href="index.css">
          </head>
          <body>
            <div id="root"></div>
            <script src="index.js"></script>
          </body>
          </html>
          `
      }
    }),
    scss({
      output: 'public/index.css'
    }),
    isProd && terser(),
    !isProd &&
      serve({
        port: 3000,
        host: 'localhost',
        // 当遇到错误后重定向到哪个文件
        historyApiFallback: resolveFile('dist/index.html'),
        // 静态资源
        contentBase: [resolveFile('dist')],
        // 在开发服务中添加一些输出的一些信息
        onListening: function (server) {
          console.log('\x1B[33m%s\x1b[0m:', 'The rollup dev Serve is start!!!')
          const address = server.address()
          const host = address.address === '::' ? 'localhost' : address.address
          // by using a bound function, we can access options as `this`
          const protocol = this.https ? 'https' : 'http'
          console.log(
            '\x1B[36m%s\x1B[0m',
            `Serve is listening in ${address.port}`
          )
          console.log(
            '\x1B[35m%s\x1B[39m',
            `You can click   ${protocol}://${host}:${address.port}/   go to Browser`
          )
          console.log(
            '\x1B[34m%s\x1B[39m',
            `You can click   ${protocol}://localhost:${address.port}/  go to Browser`
          )
        }
      }),
    !isProd &&
      livereload({
        watch: 'dist'
      })
  ]
}
