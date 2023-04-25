import commonjs from '@rollup/plugin-commonjs' // 让 Rollup 能够导入 cmj 模块
import resolve from '@rollup/plugin-node-resolve' // 让 Rollup 找到外部模块
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript' // 解析ts
import terser from '@rollup/plugin-terser' // 压缩打包代码
import del from 'rollup-plugin-delete' // Delete files and folders

export default {
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/bundle.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd',
      name: 'MyLibrary',
      sourcemap: true
    }
  ],
  plugins: [
    typescript(), // 会自动读取文件tsconfig.json配置
    commonjs(),
    resolve(),
    // terser(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**'
    }),
    del({ targets: 'dist/*' })
  ],
  external: ['react', 'react-dom']
}
