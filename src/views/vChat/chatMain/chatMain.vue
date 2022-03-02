<template>
  <div class="vchat-main" v-show="isChatOpen">
    <div class="vchat-main-left">
      <vchat-menubar></vchat-menubar>
    </div>
    <div class="vchat-main-right">
      <!-- 会话模块 -->
      <vchat-sessions v-if="curModule === 'session'"></vchat-sessions>
      <!-- 通讯录模块 -->
      <vchat-addresslist
        v-else-if="curModule === 'addresslist'"
      ></vchat-addresslist>
      <!-- 收到的申请消息模块 -->
      <vchat-apply v-else-if="curModule === 'apply'"></vchat-apply>
      <!-- 收到的回复消息模块 -->
      <vchat-applyback id="vch"></vchat-applyback>
    </div>
  </div>
</template>

<script>
import vchatMenubar from './chatMenubar'
import vchatSessions from './chatSessions/chatSessions.vue'
import vchatAddresslist from './chatAddresslist/chatAddresslist.vue'
import vchatApply from './chatApply/chatApply.vue'
import vchatApplyback from './chatApplyback/chatApplyback.vue'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('chat')
export default {
  components: {
    vchatMenubar,
    vchatSessions,
    vchatAddresslist,
    vchatApply,
    vchatApplyback
  },
  computed: {
    ...mapState(['isChatOpen', 'curModule']),
  },
  methods: {
    ...mapActions(['getInitChatInfo']),
  },
  created() {
    this.getInitChatInfo()
  },
}
</script>

<style lang="less">
.vchat-main {
  position: fixed;
  top: 100px;
  left: 100px;
  // width: 900px;
  height: 600px;
  box-sizing: content-box;
  display: flex;

  overflow: hidden;
  border-radius: 3px;
  border: 1px solid #d9d9d9;
  background-color: #fff;

  &-left,
  &-right {
    height: 100%;
  }
  &-left {
    width: 55px;
    flex: none;
  }
  &-right {
    // flex: 1;
    width: 850px;
  }
  &-main {
    width: 100%;
    height: 100%;
    display: flex;
  }
}
</style>
