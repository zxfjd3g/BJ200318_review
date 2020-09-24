### Vue相关API

#### 1) 全局配置

- Vue.config对象的属性
- productionTip

#### 2) 全局API

- Vue的一些方法
- Vue.component()
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



#### 2) 缓存组件



#### 3) 异步组件



#### 4) 函数式组件



#### 5) 递归组件



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
	props
	vue自定义事件
	v-model
	.sync
	$ref, $children与$parent
	插槽 ==> 作用域插槽
祖孙
	$attrs与$listeners
	provide与inject
兄弟或其它/任意
	全局事件总线
	Vuex
```

#### 3) 各种组件间通信详细说明

查看 ***vue_组件间通信.md***



### Vue的响应式原理

#### Vue数据绑定/响应式

![vue响应式原理](.\images\vue响应式原理.png)

- 理解:
  - 说vue的数据绑定的原理, 或者数据响应式的原理, 都是在说一个事
  - 当我们修改了data中的数据时, 组件界面是如何自动更新的
  - 这里涉及下面几个重点
    - 数据代理: Object.defineProperty()
    - 数据劫持: Object.defineProperty()
    - 发布-订阅模式: observer 与 dep 与 watcher

- 数据代理 
  - 通过Object.defineProperty()给vm添加与data对象中对应的属性
  - 在getter中, 读取data中对应的属性值返回  ==> 当我们通过this.xxx读值时, 读取的是data中对应的属性值
  - 在setter中, 将最新的值保存到data中对应的属性上  ==>当我们通过this.xxx = value时, value保存在data中对应的属性上
- 数据劫持
  - 在observer中, 通过Object.defineProperty()给data中所有层次属性都添加上getter/setter
  - 为每个属性都创建一个dep对象, 用于后面更新 / 
  - 注意: 在解析模板时, 为每个表达式都创建了一个用于更新对应节点的watcher
  - 在getter中, 去建立dep与watcher之间的关系
    - 一个dep中, 保存了包含n个watcher的数组
    - 一个watcher中, 保存了包含n个dep的对象
  - 在setter中, 通过dep去通知所有watcher去更新对应的节点
- 发布-订阅模式
  - 发布者: observer
  - 订阅者: watcher
  - 订阅器: dep
- 更新数据后的基本流程
  - this.xxx = value
  - 由于有数据代理, data中的xxx会更新
  - 由于有数据劫持, xxx对应的setter就会调用
  - 在setter中, 通过dep去通知所有对应的watcher去更新对应的节点

#### Vue双向数据绑定

- 通过v-model来实现双向数据绑定
- v-model的本质
  - 将动态的data数据通过value属性传给input显示  ==> data到view的绑定
  - 给input标签绑定input监听, 一旦输入改变读取最新的值保存到data对应的属性上 ==> view到data的绑定

### Vue路由: vue-router

#### 一些基本知识

- 跳转路由的2种基本方式
	- 声明式路由
	- 编程式路由

- 跳转路由携带参数的类型
	- params
	- query参数
- 将params参数或query参数映射成props
	- ~~通过state携带数据 (必须history路由)~~      vue-router没有设计, react的路由中设计了
	
- location的2种类型
	- 字符串
	- 对象形式

####   参数相关问题

- params与path配置能不能同时使用
- 如何配置params参数可传可不传?
- 路由组件能不能传递props参数?
- 编程式路由跳转到当前路由, 参数不变会报出错误?
- 如何让路由跳转后, 滚动条自动停留到起始位置?

#### 有点难度, 但很重要的

- 路由懒加载: 
  - () => import('./Home.vue')
  - 组件单独打包, 开始不加载其打包文件, 第一次请求时才会加载 ==> 加载更快, 提高用户体验
- 缓存路由组件
  - <keep-alive><router-view/></keep-alive>
  - 路由离开时不销毁, 路由回来时不用重新创建  ==> 利用缓存, 切换路由更快
  - 再利用上prefetch实现预获取, 用户体验更佳
- 动态添加路由
  - router.addRoutes(routes)
  - 在异步确定用户的权限路由后, 需要动态添加到路由器
- 路由守卫与权限校验
  - router.beforeEach()注册全局前置守卫
  - 统一对用户权限进行一系列的校验处理
- history与hash路由的区别和原理
  - 区别:
    - history:  路由路径不#, 刷新会携带路由路径, 默认会出404问题, 需要配置返回首页
    - hash: 路由路径带#, 刷新不会携带路由路径, 请求的总是根路径, 返回首页, 没有404问题
  - 原理:
    - history: 内部利用的是history对象的pushState()和replaceState() (H5新语法)
    - hash: 内部利用的是location对象的hash语法

####   路由导航守卫的理解和使用

- 全局前置守卫
- 路由/组件前置守卫

### Vue状态管理: Vuex

#### vuex的5大属性

- state
- mutations
- actions
- getters
- modules

#### vuex的数据流结构图

![vuex](.\images\vuex.png)



#### vuex多模块编程

- vuex的多模块编程的必要性
  - vuex单模块问题: 
    - 需要的管理状态数据比较多, 那对应的mutations/actions模块就会变得比较大
    - 如果添加新的数据管理, 需要修改现在文件(不断向其添加内容) 
  - vuex多模块编程: 对各个功能模块的数据分别进行管理, 这样更加具有扩展性

-  什么时候需要用vuex多模块编程? 需要vuex管理的数据比较多时使用
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

#### 问题1: vuex中的mutation可以执行异步操作吗?



#### 问题2: vuex数据刷新丢失的问题

