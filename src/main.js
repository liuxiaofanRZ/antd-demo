import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局引入antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
// 全局样式
import '@/assets/css/common.less'

Vue.config.productionTip = false

import customTree from './views/customTree/customTree.vue'
Vue.component('custom-tree', customTree)

function vcdrag(bar, { value }) {
  let box = document.querySelector('#' + value)
  bar.style.cursor = 'move'
  bar.onmousedown = function (e) {
    let disx = e.pageX - box.offsetLeft
    let disy = e.pageY - box.offsetTop
    document.onmousemove = function (e) {
      e.stopPropagation()
      e.preventDefault()
      let x = e.pageX - disx
      let y = e.pageY - disy
      let maxX =
        document.body.clientWidth - parseInt(window.getComputedStyle(box).width)
      let maxY =
        document.body.clientHeight -
        parseInt(window.getComputedStyle(box).height)
      if (x < 0) {
        x = 0
      } else if (x > maxX) {
        x = maxX
      }

      if (y < 0) {
        y = 0
      } else if (y > maxY) {
        y = maxY
      }

      box.style.left = x + 'px'
      box.style.top = y + 'px'
    }
    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null
    }
  }
}

Vue.directive('vcdrag', {
  inserted: vcdrag,
  // componentUpdated: vcdrag,
})

// import "@/views/vChat/iconfont/iconfont.css";

export default new Vue({
  router,
  store,
  chatWs: null,
  render: (h) => h(App),
}).$mount('#app')
