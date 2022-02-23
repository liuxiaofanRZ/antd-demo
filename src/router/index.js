import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/taskSelect',
    name: 'taskSelect',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "taskSelect" */ '../views/taskSelect/taskSelectIndex.vue'
      ),
  },
  {
    path: '/addObject',
    name: 'addObject',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "addObject" */ '../views/addObject/addObjectIndex.vue'
      ),
  },
  {
    path: '/OaFawenDetail',
    name: 'OaFawenDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "OaFawenDetail" */ '../views/OaFawenDetail/OaFawenDetailIndex.vue'
      ),
  },
  {
    path: '/customTree',
    name: 'customTree',
    component: () => import('../views/customTree/customTreeIndex.vue'),
  },
  {
    path: '/learnRender',
    name: 'learnRender',
    component: () => import('../views/learnRender/learnRenderIndex.vue'),
  },
  {
    path: '/seat',
    name: 'seat',
    component: () => import('../views/seat/seatIndex.vue'),
  },
  {
    path: '/tableCustom',
    name: 'tableCustom',
    component: () => import('../views/tableCustom/tableCustomIndex.vue'),
  },
  {
    path: '/antdIcon',
    name: 'antdIcon',
    component: () => import('../views/antdIcon/antdIconIndex.vue'),
  },
  {
    path: '/boxToChoose',
    name: 'boxToChoose',
    component: () => import('../views/boxToChoose/boxToChooseIndex.vue'),
  },
  {
    path: '/draggable',
    name: 'draggable',
    component: () => import('../views/draggable/draggableIndex.vue'),
  },
  {
    path: '/loginIco',
    name: 'loginIco',
    component: () => import('../views/loginIco/loginIcoIndex.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
