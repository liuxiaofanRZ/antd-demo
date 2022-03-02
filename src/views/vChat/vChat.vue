<template>
  <div v-if="token" class="vchat">
    <!-- 聊天悬浮按钮 -->
    <vchat-btn></vchat-btn>
    <!-- 主窗口 -->
    <vchat-main id="vchat_main_drag"></vchat-main>
    <!-- 查找窗口 -->
    <vchat-find id="vchat_find_drag"></vchat-find>
    <!-- 聊天记录 -->
    <vchat-history id="vchat_history_drag"></vchat-history>
  </div>
</template>

<script>
import vchatBtn from './chatBtn/chatBtn.vue'
import vchatMain from './chatMain/chatMain.vue'
import vchatFind from './chatFind/chatFind.vue'
import vchatHistory from './chatHistory/chatHistory.vue'

import { mapState, createNamespacedHelpers } from 'vuex'
const { mapActions: mapActionsChat } = createNamespacedHelpers('chat')
import { queryMsgBoxCount } from '@/axios/vChatApi'

import socket from '@/socket/service'
import { BASE_URL } from '@/util/env'

export default {
  name: 'vChat',
  components: { vchatMain, vchatBtn, vchatFind, vchatHistory },
  data() {
    return {
      ws: null,
    }
  },
  computed: {
    ...mapState(['token', 'info']),
  },
  watch: {
    token(token) {
      if (token) {
        this.initSocket()
      } else {
        this.$root.chatWs.close()
      }
    },
  },
  destroyed() {
    this.$root.chatWs.close()
  },
  methods: {
    ...mapActionsChat(['receiveMessage', 'receiveFindAsk','receiveApplyBack']),
    initSocket() {
      this.$root.chatWs = new socket({
        isReconnection: false,
        isHeart: false,
        onopen: () => {
          queryMsgBoxCount()
        },
        // window._CONFIG['domianURL']
        url:
          BASE_URL.replace('https://', 'ws://').replace('http://', 'ws://') +
          '/eoaSocket/' +
          this.info.id,
        onmessage: (res) => {
          console.log(JSON.parse(res))
          let msg = JSON.parse(res)
          if (msg.type === 'chatMessage') {
            this.receiveMessage(msg.data)
          } else if (msg.type === 'find') {
            this.receiveFindAsk(msg.data)
          } else if (msg.type === 'msgbox') {
            console.log(1111111111111111111);
            this.receiveApplyBack(msg.data)
          }
        },
      }).connect()
    },
  },
}
</script>

<style lang="less">
@import url('./iconfont/iconfont.css');

@border: 1px solid #d9d9d9;
@borderRadius: 2px;
.vchat {
  position: fixed;
  width: 0;
  height: 0;
  right: 0;
  bottom: 0;
  font-size: 16px;
  color: #000;
  z-index: 10;

  .vchat-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .vchat-img {
    max-width: 100%;
  }
  .vchat-link {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
