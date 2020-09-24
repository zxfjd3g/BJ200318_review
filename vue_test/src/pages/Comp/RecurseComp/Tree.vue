<template>
  <ul>
    <li v-for="(item, index) in data" :key="index" @click.stop="toggle(item)">
      {{item.text}}
      <tree :data="item.children" v-if="item.isShow"/>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'tree',
    props: ['data'],
    methods: {
      toggle (item) {
        console.log('toggle()', item)
        if (item.hasOwnProperty('isShow')) {
          item.isShow = !item.isShow
        } else {
          this.$set(item, 'isShow', true)
        }
      }
    }
  }
</script>