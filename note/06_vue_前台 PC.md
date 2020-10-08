# 前台管理项目总结

## 功能模块

    首页
    商品搜索列表
    商品详情
    购物车
    登陆与注册
    订单交易/结算
    支付
    个人中心/订单列表

## 使用的库

    vue
    vue-router
    vuex
    vee-validate
    vue-lazyload
    element-ui
    
    axios
    mockjs
    nprogress
    uuidjs
    
    swiper
    qrcode
    lodash

## Vue配置

    name
    data
    props
    computed
    watch
    methods
    mounted/created
    beforeCreate
    components

## 2个重要方法:

    vm.$nextTick()与Vue.nextTick()
    vm.$set()与Vue.set()

## 与后台交互

    axios二次封装
        1). 配置通用的基础路径和超时
        2). 显示请求进度条
        3). 成功返回的数据不再是response, 而直接是响应体数据response.data
        4). 统一处理请求错误, 具体请求也可以选择处理或不处理
        5). 每次请求都携带一个userTempId请求头, 数据值在state中
        6). 每次请求(已登陆)都携带一个token请求头, 数据值在state中
    postman与测试接口
    定义接口请求函数模块
    在vuex的异步action中调用接口请求函数
    将API挂载到Vue的原型对象上, 在组件中调用接口请求函数与后台交互: Vue.prototype.$API = this
    当后台接口还未完成时, 先mock数据, 可以使用mockjs, 当然有的公司可能有自己的一套

## vuex

    基本组成: store / state / mutations / actions / modules
    vuex多模块编程: 当要管理的数据过多时, 将每个模块的数据单独管理, 更方便, 更有扩展性
    带vuex的整体编码组成:
        component:
            触发action调用请求获取数据: dispatch()
            读取vuex中的数据: mapState() / mapGetters()
            模板动态显示数据: 插值与指令
        vuex:
            action: 调用API函数请求获取数据, 提交给mutation
            mutation: 更新state数据
        api:
            axios二次封装
            定义针对不同接口的请求函数

## 路由相关

    跳转路由的2种基本方式: 声明式路由与编程式路由
    跳转路由携带参数的类型: params与query参数
    携带参数的2种方式: 字符串与对象形式
    参数相关问题:
        params与path配置能不能同时使用
        如何配置params参数可传可不传?
        路由组件能不能传递props参数
        编程式路由跳转到当前路由, 参数不变会报出错误
    如何让路由跳转后, 滚动条自动停留到起始位置
        scrollBehavior配置
    路由导航守卫的理解和使用
        全局前置守卫
        路由/组件前置守卫

## 自定义通用型/复用型组件的基本步骤

    实现静态组件: 模板/样式写好
    设计从外部接收的数据: props
    设计内部的数据: data
    设计基于props和data的计算属性数据: computed
    根据props和data数据和computed进行动态显示
    更新数据, 更新界面, 通知父组件

## 相关问题(具体内容看笔记)

    编程式路由跳转到当前路由, 参数不变会报出错误
        vue-router版本变化: 上一个项目没问题, 新的项目有问题
        重写VueRouter原型上的push/replace方法
    优化减小打包文件: 
        对UI组件库实现按需打包
        对lodash库实现按需引入
    什么时候需要使用编程式导航代替声明式导航
        有一定条件限定
        个数太多
    优化事件处理效率: 
        利用事件委托
    如何携带点击的分类的数据?
    	event.target得到a标签
    	利用自定义的data标签属性来保存分类信息
    对mouseEnter高频事件进行节流处理
    	使用lodash的throttle进行节流处理
    解决swiper动态页面轮播的bug
        watch + $nextTick()
    解决Floor组件中轮播有问题的bug
        watch的immediate
    分发异步action后, 如何能知道处理完成了
        回调函数
        dipatch()的返回值是异步action返回的promise
    区别userTempId与Token
    	userTempId: 未登陆的标识
    	Token: 登陆用户的标识
    2种懒加载的优化手段:
        路由组件懒加载
        图片懒加载

