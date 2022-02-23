<template>
  <div id="app">
    <app-header></app-header>
    <app-sider></app-sider>
    <app-main></app-main>
    <v-chat></v-chat>
  </div>
</template>
<script>
import appHeader from '@/views/layout/appHeader.vue'
import appSider from '@/views/layout/appSider.vue'
import appMain from '@/views/layout/appMain.vue'
import vChat from '@/views/vChat/vChat.vue'
export default {
  name: 'App',
  components: { appHeader, appSider, appMain, vChat },
}
</script>
