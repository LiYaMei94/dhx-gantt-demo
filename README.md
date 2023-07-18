# gantt-demo

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

备注：新node版本可能会出现错误，修改启动命令

```
"scripts": {
   "serve": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",
   "build": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build"
},
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
