<template>
  <div>
    <!-- 动态组件 & 缓存组件 & 异步组件 -->

    <button @click="currentComp='Home'">Home</button>
    <button @click="currentComp='Posts'">Posts</button>

    <component :is="currentComp"/>
   
    <keep-alive :include="['Home']">
      <component :is="currentComp"/>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  // import Home from './components/Home'
  // import Posts from './components/Posts'

  const Home = () => import('./components/Home')
  const Posts = () => import('./components/Posts')

  export default {
    name: 'DynamicCacheAsync',

    data () {
      return {
        currentComp: 'Home'
      }
    },

    components: {
      Home,
      Posts
    }
  }
</script>
