### Vue相关API

#### 1) 全局配置

- Vue.config对象的属性
- productionTip

#### 2) 全局API

- Vue的一些方法
- Vue.component(): 注册全局组件
- Vue.directive()
- Vue.filter()
- Vue.use()
- Vue.nextTick()
- Vue.set()
- Vue.delete()

#### 3) 配置选项

- 数据
  - data
  - props
  - computed
  - methods
  - watch
- DOM
  - el
  - template
  - render
- 生命周期
  - beforeCreate
  - created
  - beforeMount
  - mounted
  - beforeUpdate
  - updated
  - beforeDestroy
  - destroyed
  - 
  - activated
  - deactivated
  - errorCaptured
- 资源
  - directives
  - filters
  - components
- 杂项
  - mixins
  - provider / inject
- 其它
  - name
  - functional

#### 4) 实例属性

- $el
- $parent
- $children
- $refs
- $attrs
- $listeners

#### 5) 实例方法

- 数据
  - vm.$watch()
  - vm.$set()
  - vm.$delete()
- 事件
  - $on()
  - $once()
  - $off()
  - $emit()
- 生命周期
  - $mount()
  - $nextTick()
  - $destroy()

#### 6) 指令

- v-text
- v-html
- v-show
- v-if
- v-else
- v-else-if
- v-for
- v-on
- v-once
- v-bind
- v-model
- v-slot

#### 7) 特殊属性

- key
- ref
- is

#### 8) 内置组件

- component
- transition
- keep-alive  
- slot

### vue组件的生命周期

#### 1) 单个组件生命周期

- 初始化:
  - beforeCreate
  - created
  - beforeMount
  - mounted
- 更新:
  - beforeUpdate
  - updated
- 死亡:
  - beforeDestroy
  - destroyed

#### 2) 父子组件的生命周期

- 初始化:
  - beforeCreate
  - created
  - beforeMount
  - *--child beforeCreate*
  - *--child created*
  - *--child beforeMount*
  - *--child mounted*
  - mounted
- 更新:
  - beforeUpdate
  - *--child beforeUpdate*
  - *--child updated*
  - updated
- 死亡:
  - beforeDestroy
  - *-- child beforeDestroy*
  - *-- child destroyed*
  - destroyed

#### 3) 带缓存的路由组件生命周期

- 初始化:
  - ...
  - mounted
  - *--Child activated*
  - activated
- 路由离开
  - *--Child deactivated*
  - deactivated
- 路由回来
  - *--Child activated*
  - activated

#### 4) 捕获子组件错误的勾子

- 子组件执行抛出错误
  - errorCaptured

#### 5) 各个生命周期勾子说明

![vue组件生命周期详图](.\images\vue组件生命周期详图.png)

(1) beforeCreate(): 在实例初始化之后调用, data和methods都还没有初始化完成, 通过this不能访问

(2) created(): 此时data和methods都已初始化完成, 可以通过this去操作, 可以在此发ajax请求

(3) beforeMount(): 模板已经在内存中编译, 但还没有挂载到页面上, 不能通过ref找到对应的标签对象

(4) mounted(): 页面已经初始显示, 可以通过ref找到对应的标签, 也可以选择此时发ajax请求

(5) beforeUpdate(): 在数据更新之后, 界面更新前调用, 只能访问到原有的界面

(6) updated(): 在界面更新之后调用, 此时可以访问最新的界面

(7) beforeDestroy(): 实例销毁之前调用, 此时实例仍然可以正常工作

(8) destroyed(): Vue 实例销毁后调用, 实例已经无法正常工作了



(9) deactivated():组件失活, 但没有死亡

(10) activated(): 组件激活, 被复用

(11) errorCaptured(): 用于捕获子组件的错误,return false可以阻止错误向上冒泡(传递)



### 组件深入

#### 1) 动态组件

- 通过<component>动态确定要显示的组件,  is指定要显示组件的组件名

```vue
<component :is="currentComp" />
```

- 问题: 当从A组件切换到B组件时, A组件就会销毁

#### 2) 缓存组件

- 使用<keep-alive>缓存动态组件, 可以通过include或exclude指定只缓存特定组件

```vue
<keep-alive :exclude="['Home']">
	<component :is="currentComp"/>
</keep-alive>
```

- 使用<keep-alive>也可以缓存路由组件

```vue
<keep-alive include="Life1">
	<router-view></router-view>
</keep-alive>
```

- 路由组件对象什么时候创建?
  - 默认: 每次跳转/访问对应的路由路径时
  - 有缓存: 第一次访问时
- 路由组件对象什么时候死亡?
  - 默认: 离开时
  - 有缓存: 离开时不死亡, 只有当destroy/父组件死亡/刷新页面

#### 3) 异步组件 

- 好处: 能更快的看到当前需要展现的组件界面(异步组件的代码开始没有加载)

- 无论是**路由组件**还是**非路由组件**都可以实现异步组件效果
  - 拆分单独打包
  - 需要时才请求加载组件对应的打包文件

- 配置组件: component: () => import(modulePath)
  - import(modulePath): 被引入的模块会被单独打包(code split)      --ES8的新语法
  - () => import(modulePath): 函数开始不调用, 当第一次需要显示对应的界面时才会执行, 请求加载打包文件
- 细节
  - import()返回promise, promise成功的结果就是整体模块对象
  -  本质上: 可以利用import()实现对任意模块的懒加载

#### 4) 函数式组件 + JSX

- 函数组件的特点
  - 只能针对无状态(data)的组件
  - 不用创建实例对象, 运行更快
  - 可以没有根标签
- 编码

```js
export default {
    functional: true, // 当前是函数组件
    render (createElement, context) {
        return 要显示界面的虚拟DOM
    }
}
```

#### 5) 递归组件

- 递归组件: 组件内部有自己的子组件标签
- 应用场景: 用于显示树状态结构的界面
- 注意: 递归组件必须有name
- 编码: 实现一个简单的可开关的树状结构界面的 Tree 组件

### Vue组件间多种通信方式

#### 1) 组件间通信方式列表

```
1) props
2) vue自定义事件
3) 全局事件总线
4) v-model
5) .sync
6) $attrs与$listeners
7) $ref, $children与$parent
8) provide与inject
9) Vuex
10) 插槽 ==> 作用域插槽
```

#### 2) 通信方式的选择

```
父子
	props: 
		父向子
		子向父
	vue自定义事件: 
		子向父
	v-model: 
		父子之间
	.sync: 
		在父向子的基础上添加子向父
	$ref, $children与$parent: 
		$ref/$children: 父向子
		$parent: 子向父
	插槽 ==> 作用域插槽
		默认插槽/具名插槽: 父组件向子组件传递标签内容
		作用域插件: 子向父传递数据后, 父组件根据接收到的数据来决定向子组件传递不同的标签内容
祖孙
	$attrs与$listeners
	provide与inject
兄弟或其它/任意
	全局事件总线
	Vuex
```

#### 3) 各种组件间通信详细说明

查看 ***vue_组件间通信.md***



### Vue的响应式

#### 1) 几个重要问题?

- mvvm的理解, 与MVC的区别?

  > 查看word

- 组件的data为什么只能是函数不能是对象?

  - 同一个组件的多个组件实例的data必须是不同的对象(内容初始数据可以相同)
  - 如果是data是对象, 组件的多个实例共用一个data对象
  - 如果是函数, 组件对象通过调用函数得到的一个新的data对象

- 响应式数据与非响应式数据?
  - 响应式: data / props / computed/ vuex的state与getters
  - 非响应式:　仅仅存在于组件对象上的属性数据
    - 给组件对象添加一个新属性: this.xxx = value 
    - 直接给一个响应式对象添加一个新属性: this.product.xxx = 'abc'
- 对象的响应式与数组的响应式有什么区别?
  - 对象: 通过Object.defineProperty()添加setter方法来监视属性数据的改变 + 订阅-发布
  - 数组: 重新数据一系列的更新数组元素的方法 + 订阅-发布



#### 2) Vue数据绑定/响应式原理图

![vue响应式原理](.\images\vue响应式原理.png)

- 理解:
  - 说vue的数据绑定的原理, 或者数据响应式的原理, 都是在说一个事
  - 当我们修改了data中的数据时, 组件界面是如何自动更新的
  - 这里涉及下面几个重点
    - 数据代理: Object.defineProperty()
    - 数据劫持: Object.defineProperty()
    - 发布-订阅: observer 与 dep 与 watcher

- 数据代理 
  - 通过Object.defineProperty()给vm添加与data对象中对应的属性
  - 在getter中, 读取data中对应的属性值返回  ==> 当我们通过this.xxx读值时, 读取的是data中对应的属性值
  - 在setter中, 将最新的值保存到data中对应的属性上  ==>当我们通过this.xxx = value时, value保存在data中对应的属性上
  - 作用: 简化对vm/组件对象内部的data对象的属性数据的操作(读/写)
- 数据劫持/监视
  - 在observer中, 通过Object.defineProperty()给data中所有层次属性都添加上getter/setter
  - 为每个属性都创建一个dep对象, 用于后面更新 / 
  - 注意: 在解析模板时, 为每个表达式都创建了一个用于更新对应节点的watcher
  - 在getter中, 去建立dep与watcher之间的关系
    - dep与data中的属性一一对应
    - watcher与模板中的表达式一一对应
    - 一个dep中, 保存了包含n个watcher的数组  ==> 当多个表达式用到当前dep所对应的属性
    - 一个watcher中, 保存了包含n个dep的对象 ==> 当表达式是一个我层的表达式
  - 在setter中, 通过dep去通知所有watcher去更新对应的节点
- 发布-订阅模式
  - 发布者: observer
  - 订阅者: watcher
  - 订阅器/中间人: dep
- 更新数据后的基本流程
  - this.xxx = value
  - 由于有数据代理, data中的xxx会更新
  - 由于有数据劫持, xxx对应的setter就会调用
  - 在setter中, 通过dep去通知所有对应的watcher去更新对应的节点

#### 3) Vue双向数据绑定

- 通过v-model来实现双向数据绑定
- v-model的本质
  - 将动态的data数据通过value属性传给input显示  ==> data到view的绑定
  - 给input标签绑定input监听, 一旦输入改变读取最新的值保存到data对应的属性上 ==> view到data的绑定
- 双向数据绑定是在单向数据绑定(data-->view)的基础, 加入input事件监听(view ==> data)



### 可复用性

#### 1) mixin(混入)

- 用来复用多个组件中相关的js代码的技术
- 将多个组件相同的js代码提取出来, 定义在一个mixin中配置对象
- 在多个组件中通过mixins配置引入mixin中的代码, 会自动合并到当前组件的配置中

#### 2) 自定义指令

```js
Vue.directive('upper-text', (el, binding) => {
    el.innerText = binding.value.toUpperCase()
})
```

#### 3) 自定义过滤器

```js
// 注册全局过滤器
Vue.filter('date-format', (value) => {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
})
```

#### 4) 自定义插件

```js
// 对象插件
const myPlugin = {
    install (Vue) {
        // 通过Vue来扩展新的功能语法, 如注册全局组件/指令/过滤器/...
    }
}
// 函数插件
const myPlugin = (Vue) => {
    // 通过Vue来扩展新的功能语法, 如注册全局组件/指令/过滤器/...
}

export default myPlugin

// 在入口JS中引入, 并声明使用来安装插件
import myPlugin from './vue-myPlugin'
Vue.use(myPlugin)
```

#### 问题: Vue.use()内部做了什么?

- 对象插件: 调用插件对象install方法(传入Vue)来安装插件(执行定义新语法的代码)
- 函数插件: 直接将其作为install来调用(传入Vue)来安装插件(执行定义新语法的代码)

### Vue状态管理: Vuex

#### 1) vuex的5大属性

- state
- mutations
- actions
- getters
- modules

#### 2) vuex的数据流结构图

![vuex](.\images\vuex.png)



#### 3) vuex多模块编程

- vuex的多模块编程的必要性
  - vuex单模块问题: 
    - 需要的管理状态数据比较多, 那对应的mutations/actions模块就会变得比较大
    - 如果添加新的数据管理, 需要修改现在文件(不断向其添加内容) 
  - vuex多模块编程: 对各个功能模块的数据分别进行管理, 这样更加具有扩展性

- 什么时候需要用vuex多模块编程? 需要vuex管理的数据比较多时使用
- 多模块编程的总state结构:

```js
{
	home: {
        categoryList: [],
        xxx: {}
    },
    user: {
        userInfo: {}
    }
}
```

#### 4) 问题1: vuex中的mutation可以执行异步操作吗?

- 可以 ==> 异步更新数据后界面确实会自动更新
- 问题 ==> vuex的调用工具监视不到mutation中的异步更新, 工具记录还是更新前的数据(不对)
- 扩展: 工具如何记录数据变化? ==> 每次mutation函数执行完后, 立即记录当前的数据   ==> 在mutation中同步更新state, 才能被记录到

#### 5) 问题2: vuex数据刷新丢失的问题

- 绑定事件监听: 在卸载前保存当前数据

```js
window.addEventListener('beforeunload', () => {
	sessionStorage.setItem('CART_LIST_KEY', 
		JSON.stringify(this.$store.state.shopCart.cartList))
})
```

- 在初始时读取保存数据作为状态的初始值

```js
cartList: JSON.parse(sessionStorage.getItem('CART_LIST_KEY')) || [],
```



### Vue路由: vue-router

#### 1) 一些基本知识

- 跳转/导航路由的2种基本方式
	- 声明式路由:  <router-link to="/xxx">xxx</router-link/>
	- 编程式路由: this.$router.push(location)

- 跳转路由携带参数(数据)的方式
	- params
	- query参数
	- props
	  -  props: true, // 只能同名映射params参数
	  - props: {a: 1, b: 'abc'}, // 只能映射非params/query参数
	  - props: route => ({keyword3: route.params.keyword, keyword4: route.query.keyword2, xxx: 12}), //可以指定任何数据都可以
- location的2种类型值
	- 字符串 path
	- 对象形式: {name, path, params, query}
	- push(location)
	- <router-link :to="{}">

####   2) 参数相关问题

- params与path配置能不能同时使用

  不可以: router.push({path: '/xx', params: {name: 'tom'}})

  params只能与name配合: router.push({name: 'xx', params: {name: 'tom'}})   

- 如何配置params参数可传可不传?

  path: '/search/:keyword?',    

  注意: 一旦声明可以不传, 不能传入一个空串的param参数

- 路由组件能不能传递props参数?

  可以, 但只是将params/query映射成props传入路由组件的

- 编程式路由跳转到当前路由, 参数不变, 会报出错误?  ==> 在做项目时有没有遇到比较难/奇怪的问题?

  - 说明情况:

    - 上一个项目这种操作没有这个问题
    - 后面的一个项目(2019.8之后)开始有这个问题, 而且是声明式跳转没有, 只有编程式跳转有

  - 当编程式跳转到当前路由且参数数据不变, 就会出警告错误:

    错误: Avoided redundant navigation to current location ==> 重复跳转当前路由

  - 原因: 

    vue-router在3.1.0版本(2019.8)引入了push()的promise的语法, 如果没有通过参数指定回调函数就返回一个promise来指定成功/失败的回调, 且内部会判断如果要跳转的路径和参数都没有变化, 会抛出一个失败的promise

    说明文档: https://github.com/vuejs/vue-router/releases?after=v3.3.1

  - 解决:

    - 办法1: 在每次push时指定回调函数或catch错误
    - 办法2: 重写VueRouter原型上的push方法 (比较好)
      - 1). 如果没有指定回调函数, 需要调用原本的push()后catch()来处理错误的promise
      - 2). 如果传入了回调函数, 本身就没问题, 直接调用原本的push()就可以

    ```js
    const originPush = VueRouter.prototype.push
    VueRouter.prototype.push = function (location, onComplete, onAbort) {
      console.log('push()', onComplete, onAbort)
      // 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
      if (onComplete===undefined && onAbort===undefined) {
        return originPush.call(this, location).catch(() => {})
      } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
        return originPush.call(this, location, onComplete, onAbort)
      }
    }
    ```
  ```
  
  ```
  
- 说明:
  
      声明式路由跳转之所有没有问题, 是因为默认传入了成功的空回调函数

#### 3) 有点难度, 但很重要的

- 路由懒加载: 
  - () => import('./Home.vue')
  - 组件单独打包, 开始不加载其打包文件, 第一次请求时才会加载 ==> 加载更快, 提高用户体验
  
- 缓存路由组件

  ```vue
  <keep-alive>
      <router-view/>
  </keep-alive>
  ```

​			路由离开时不销毁, 路由回来时不用重新创建  ==> 利用缓存, 切换路由更快

​			再利用上prefetch实现预获取, 用户体验更佳

- 动态添加路由
  - router.addRoutes(routes)
  - 在异步确定用户的权限路由后, 需要动态添加到路由器
  
- 路由守卫与权限校验
  - router.beforeEach()注册全局前置守卫
  - 统一对用户权限进行一系列的校验处理
  
- history与hash路由的区别和原理
  - 区别:
    - history:  路由路径不#, 刷新会携带路由路径, 默认会出404问题, 需要配置返回首页

      - 404: 

        - history有: 刷新请求时会携带前台路由路径, 没有对应的资源返回
        - hash没有: 刷新请求时不会携带#路由路径

      - 解决: 

        - 开发环境: 如果是脚手架项目本身就配置好 

          ==> webpack ==> devServer: {`historyApiFallback` : true}

          当使用 [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History) 时, 所有的 `404` 请求都会响应 `index.html` 的内容

      - 生产环境打包运行:

        - 配置nginx

          ```nginx
          location / {
            try_files $uri $uri/ /index.html; # 所有404的请求都返回index页面
          }
          ```

    - hash: 路由路径带#, 刷新不会携带路由路径, 请求的总是根路径, 返回首页, 没有404问题
  - 原理:
    - history: 内部利用的是history对象的pushState()和replaceState() (H5新语法)
    - hash: 内部利用的是location对象的hash语法

- 如何让路由跳转后, 滚动条自动停留到起始位置?

  ```js
  new VueRouter({ // 配置对象
    // ...
    scrollBehavior (to, from, savedPosition) {
      // 指定路由跳转后滚条的坐标
      return { x: 0, y: 0 }
    }
  })
  ```

- 如何实现登陆后, 自动跳转到前面要访问的路由界面

  - 在全局前置守卫中, 强制跳转到登陆页面时携带目标路径的redirect参数

    ```js
    if (token) {
      next()
    } else {
      // 如果还没有登陆, 强制跳转到login
      next('/login?redirect='+to.path)  // 携带目标路径的参数数据
    }
    ```

    

  - 在登陆成功后, 跳转到redirect参数的路由路径上

    ```js
    await this.$store.dispatch('login', {mobile, password})
    // 成功了, 跳转到redirect路由 或 首页
    const redirect = this.$route.query.redirect
    this.$router.replace(redirect || '/')
    ```

    

####   4) 路由导航守卫的理解和使用

- 导航守卫是什么?

  - 导航守卫是vue-router提供的下面2个方面的功能
    - 监视路由跳转  -->回调函数
    - 控制路由跳转  -->  放行/不放行/强制跳转到指定位置    next()
  - 应用
    - 在跳转到界面前, 进行用户权限检查限制(如是否已登陆/是否有访问路由权限)
    - 在跳转到登陆界面前, 判断用户没有登陆才显示

- 导航守卫分类

  - 全局守卫: 针对任意路由跳转

    - 全局前置守卫

      ```js
      router.beforeEach((to, from, next) => {
        // ...
      })
      ```

    - 全局后置守卫

      router.afterEach((to, from) => {})

  - 路由守卫

    - 前置守卫

      ```js
      {
      	path: '/foo',
      	component: Foo,
      	beforeEnter: (to, from, next) => {}
      },
          
      ```
  
    {
      	path: '/xxx',
    	component: Foo,
      	beforeEnter: (to, from, next) => {}
    }
  
      ```
    
      ```
  
  - 组件守卫: 只针对当前组件的路由跳转
  
    - 进入
  
      ```js
      beforeRouteEnter (to, from, next) {
          // 在渲染该组件的对应路由被 confirm 前调用
          // 不！能！获取组件实例 `this`
          // 因为当守卫执行前，组件实例还没被创建
        
        next(vm => {
        	// 通过 `vm` 访问组件实例
        	})
    },
      ```
  
    - 更新: 
  
      beforeRouteUpdate (to, from, next) {}
  
    - 离开
  
      beforeRouteLeave (to, from, next) {}

