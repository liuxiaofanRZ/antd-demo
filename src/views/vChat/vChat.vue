<template>
  <div v-if="token" class="vchat">
    <!-- 面板窗口 -->
    <chat-board></chat-board>
    <!-- 聊天窗口 -->
    <chat-box v-vchat-draggable="'vchatboxdragbar'"></chat-box>
    <!-- 查找窗口 -->
    <chat-find v-vchat-draggable="'vchatfinddragbar'"></chat-find>
    <!-- 消息盒子窗口 -->
    <chat-apply v-vchat-draggable="'vchatapplydragbar'"></chat-apply>
  </div>
</template>

<script>
import chatBox from './chatBox/chatBox.vue'
import chatFind from './chatFind/chatFind.vue'
import chatBoard from './chatBoard/chatBoard.vue'
import chatApply from './chatApply/chatApply.vue'
import { mapState, createNamespacedHelpers } from 'vuex'
const { mapActions: mapActionsChat } = createNamespacedHelpers('chat')
import { queryMsgBoxCount } from '@/axios/vChatApi'

import socket from '@/socket/service'
import { BASE_URL } from '@/util/env'

export default {
  name: 'vChat',
  components: { chatBoard, chatBox, chatFind, chatApply },
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
    console.log(this.$root)
    this.$root.chatWs.close()
  },
  methods: {
    ...mapActionsChat(['receiveMessage', 'receiveFind']),
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
            this.receiveFind(msg.data)
          } else if (msg.type === 'msgBox') {
            console.log(msg.data)
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
  right: 0;
  bottom: 0;
  font-size: 16px;
  color: #000;
  z-index: 10;

  .vchat-board-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 155px;
  }
  .vchat-img {
    max-width: 100%;
  }
  .vchat-link {
    &:hover {
      text-decoration: underline;
    }
  }

  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vchat-header {
    display: flex;
    padding: 0 10px;
    height: 40px;
    align-items: center;
    background-color: rgba(245, 245, 245, 0.7);
    &-left,
    &-middle,
    &-right {
      flex: none;
    }
    &-middle {
      flex: 1;
    }
    &-title {
      padding: 0 5px;
    }
    &-menu {
      display: flex;
      &-item {
        margin: 0 5px;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
