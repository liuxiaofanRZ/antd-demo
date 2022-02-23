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

export default new Vue({
  router,
  store,
  chatWs: null,
  render: (h) => h(App),
}).$mount('#app')
