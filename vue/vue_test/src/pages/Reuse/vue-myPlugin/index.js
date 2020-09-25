import moment from 'moment'
import HintButton from './hint-button.vue'

// 如果插件是一个对象, 必须有install方法
// export default {
//   install (Vue) {
//     // 注册全局组件
//     Vue.component(HintButton.name, HintButton)

//     // 注册指令
//     Vue.directive('upper-text', (el, binding) => {
//       el.innerText = binding.value.toUpperCase()
//     })

//     // 注册全局过滤器
//     Vue.filter('date-format', (value) => {
//       return moment(value).format('YYYY-MM-DD HH:mm:ss')
//     })
//   }
// }

// 如果插件是一个函数, 会作为install方法被回调
function myPlugin (Vue) {
  // 注册全局组件
  Vue.component(HintButton.name, HintButton)

  // 注册指令
  Vue.directive('upper-text', (el, binding) => {
    el.innerText = binding.value.toUpperCase()
  })

  // 注册全局过滤器
  Vue.filter('date-format', (value) => {
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  })
}

export default myPlugin