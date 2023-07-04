# test

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 参数说明
```
oa公告接口文档

AppID: zhjn_oa
参数：redirect=NoticesDetail&bulId=xxxxxx&from=workbench
eg: bulId=670869647114347

字段说明
redirect：入口，NoticesDetail 代表公告详情页
bulId: 公告ID
from：来源判断，workbench代表从APP端进入




oa新闻接口文档

AppID: zhjn_oa
参数：redirect=NewsDetail&newsId=xxxxxx&from=workbench
eg: newsId=670869647114347

字段说明
redirect：入口，NewsDetail 代表新闻详情页
newsId: 新闻ID
from：来源判断，workbench代表从APP端进入
```
````
头像、图标不显示升级改造步骤
1、在项目文件中新增方法
src->filters->filters.js文件的filters对象中
src->mixins->common.js文件的methods对象中
新增
-----------------------------------
    formatPhotos(data) {
      return `${data}/jnbank.png`
    }
-----------------------------------
方法
2、在src->store-getters.js文件中开启头像
-----------------------------------
  avatar: state => { // 头像
    return state.user.userInfo.avatar_url || noAvatar
    // return noAvatar
  },
-----------------------------------
3、在具体需要使用的地方
如：使用APP上的头像
<img :src="avatar | formatPhotos" alt="">
````