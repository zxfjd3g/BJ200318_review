<template>
  <div>
    <p>{{msg1}}</p>
    <p>{{msg2}}</p>
    <p>{{msgLength}}</p>
    <p>{{msg3}}</p>

    <button @click="msg1 += '--'">更新msg1</button>
    <button @click="msg2 += '++'">更新msg2</button>
    <button @click="$emit('update:msg3', msg3+'~~')">更新msg3</button>
    <br>
    <br>
    <br>
    <input type="text" v-model="msg1">
  </div>
</template>

<script>
export default {
  name: 'DataTest',
  props: ['msg3'],
  data () {
    this.msg2 = 'ABC'
    return {
      msg1: 'abc'
    }
  },

  computed: {
    msgLength () {
      return this.msg1.length
    }
  },

  methods: {
    update () {
      this.msg1 += '---'
      this.msg2 += '+++'
    }
  },
}
</script>
