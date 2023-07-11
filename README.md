# rollup-template

## 项目搭建

### 路径别名

tsconfig 里的 paths

@rollup/plugin-alias

```js
export default {
  // ...其他配置省略
  plugins: [
    alias({
      entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
    })
  ]
}
```

### 处理css
pnpm i rollup-plugin-postcss postcss less -D

```js
export default {
  // ...
  plugins: [
    postcss({ extract: true, use: ['less'] })
  ]
}
```

### 