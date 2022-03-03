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

    <div
      id="vchat_pic_drag"
      v-show="isChatPicOpen"
      v-vcdrag="'vchat_pic_drag'"
      class="vchat-pic"
    >
      <a-icon
        class="vchat-pic-close"
        @click="TOGGLE_CHAT_PIC()"
        type="close"
      ></a-icon>
      <img v-if="picSrc" :src="picSrc" alt="" />
    </div>
  </div>
</template>

<script>
import vchatBtn from './chatBtn/chatBtn.vue'
import vchatMain from './chatMain/chatMain.vue'
import vchatFind from './chatFind/chatFind.vue'
import vchatHistory from './chatHistory/chatHistory.vue'

import { mapState, createNamespacedHelpers } from 'vuex'
const {
  mapState: mapStateChat,
  mapMutations: mapMutationsChat,
  mapActions: mapActionsChat,
} = createNamespacedHelpers('chat')
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
    ...mapStateChat(['picSrc', 'isChatPicOpen']),
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
    ...mapMutationsChat(['TOGGLE_CHAT_PIC']),

    ...mapActionsChat(['receiveMessage', 'receiveFindAsk', 'receiveApplyBack']),
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
  .vchat-link:hover {
    cite {
      text-decoration: underline;
    }
    .vchat-download {
      color: #888;
    }
  }
  .vchat-download {
    font-size: 60px;
    display: block;
    text-align: center;
    color: #666;
  }
  .vchat-line {
    border-bottom: 1px solid #eee;
    margin: 20px 0;
  }

  .vchat-pic {
    position: fixed;
    left: 100px;
    top: 200px;
    background-color: #fff;
    z-index: 10;
    max-width: 90%;
    &-close {
      position: absolute;
      top: -20px;
      right: -20px;
      background-color: #fff;
      cursor: pointer;
    }
    img {
      width: 100%;
    }
  }
}
</style>
