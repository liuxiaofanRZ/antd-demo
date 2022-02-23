<template>
  <div v-if="token" class="vchat">
    <!-- 聊天菜单 -->
    <div v-if="isOpen" class="vchat-board-big">
      <div class="vchat-board-info">
        <div class="vchat-board-user">
          <div class="vchat-board-name vchat-board-ellipsis">
            {{ mine.username || '-' }}
          </div>
          <div class="vchat-board-status">{{ mine.status | statusText }}</div>
        </div>
        <div class="vchat-board-sign">
          <div class="sign">{{ mine.sign }}</div>
        </div>
      </div>
      <div class="vchat-board-main">
        <div class="vchat-board-tabs">
          <div
            class="vchat-board-tabs-item"
            :class="{ current: vChatBoxTabsCurrentId === tab.id }"
            @click="vChatBoxTabsCurrentId = tab.id"
            v-for="tab in vChatBoxTabs"
            :key="tab.id"
          >
            <span>{{ tab.title }}</span>
          </div>
        </div>
        <div class="vchat-board-contents">
          <div
            class="vchat-board-contents-item"
            v-if="vChatBoxTabsCurrentId === 1"
          >
            <div class="vchat-board-group" v-for="g in groups" :key="g.id">
              <div class="vchat-board-group-title vchat-board-ellipsis">
                {{ g.groupname }}
              </div>
              <div
                class="vchat-board-friend"
                @click="openChatBox(f)"
                v-for="f in g.list"
                :key="f.id"
              >
                <img
                  v-if="f.avatar"
                  class="vchat-board-friend-avatar"
                  :src="f.avatar"
                  alt="头像"
                />
                <img
                  v-else
                  class="vchat-board-friend-avatar"
                  src="./img/avatar_empty.jpg"
                  alt="没有头像"
                />

                <div class="vchat-board-friend-info">
                  <div class="vchat-board-friend-name vchat-board-ellipsis">
                    {{ f.username }}
                  </div>
                  <div class="vchat-board-friend-sign vchat-board-ellipsis">
                    {{ f.sign }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="vchat-board-contents-item"
            v-if="vChatBoxTabsCurrentId === 2"
          >
            2
          </div>
          <div
            class="vchat-board-contents-item"
            v-if="vChatBoxTabsCurrentId === 3"
          >
            3
          </div>
        </div>
      </div>
      <div class="vchat-board-menu"></div>
    </div>
    <div v-else class="vchat-board-small" @click="isOpen = true">
      <img class="vchat-board-avatar" :src="mine.avatar" alt="" />
      <span class="vchat-board-title">我的聊天</span>
    </div>

    <!-- 聊天窗口 -->
    <chat-box></chat-box>

    <button @click="queryMsgBoxCount">获取</button>
  </div>
</template>

<script>
import { queryMsgBoxCount } from '@/axios/vChatApi/index'
import chatBox from './chatBox/chatBox.vue'
import { mapState, createNamespacedHelpers } from 'vuex'
const { mapActions: mapActionsChat, mapState: mapStateChat } =
  createNamespacedHelpers('chat')

import socket from '@/socket/service'
import { BASE_URL } from '@/util/env'

export default {
  name: 'vChat',
  components: { chatBox },
  data() {
    return {
      isOpen: false,
      vChatBoxTabs: [
        {
          title: '我的好友',
          icon: '',
          id: 1,
        },
        {
          title: '通讯录',
          icon: '',
          id: 2,
        },
        {
          title: '历史会话',
          icon: '',
          id: 3,
        },
      ],
      vChatBoxTabsCurrentId: 1,
      ws: null,
    }
  },
  computed: {
    ...mapState(['token', 'info']),
    ...mapStateChat(['mine', 'groups']),
  },
  watch: {
    token(token) {
      if (token) {
        this.init()
      }
    },
  },
  filters: {
    statusText(status) {
      switch (status) {
        case 'online':
          return '在线'
        case 'hide':
          return '隐身'
        default:
          return '-'
      }
    },
  },
  methods: {
    ...mapActionsChat(['openChatBox', 'getInitChatInfo', 'receiveMessage']),
    init() {
      this.initSocket()
      this.getInitChatInfo()
    },
    initSocket() {
      this.$root.chatWs = new socket({
        isReconnection: false,
        isHeart: false,
        // window._CONFIG['domianURL']
        url:
          BASE_URL.replace('https://', 'ws://').replace('http://', 'ws://') +
          '/eoaSocket/' +
          this.info.id,
        onmessage: (res) => {
          this.receiveMessage(JSON.parse(res).data)
        },
      }).connect()
    },
    queryMsgBoxCount() {
      queryMsgBoxCount({ id: this.info.id }).then((res) => {
        console.log(res)
      })
    },
  },
  created() {},
}
</script>

<style lang="less">
@border: 1px solid #d9d9d9;
@borderRadius: 2px;
.vchat {
  position: fixed;
  right: 0;
  bottom: 0;
  font-size: 16px;
  color: #000;
  z-index: 10;
  &-board {
    &-small {
      width: 145px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      border: @border;
      border-radius: borderRadius;
      cursor: pointer;
    }
    &-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    &-title {
      padding-left: 10px;
    }

    &-big {
      width: 260px;
      height: 520px;
      z-index: 99998;
      border: @border;
      border-radius: borderRadius;
    }
    &-info {
      padding: 10px 15px 0;
      height: 60px;
    }
    &-user {
      display: flex;
    }
    &-name {
      max-width: 150px;
    }
    &-main {
      height: 420px;
    }
    &-tabs {
      height: 50px;
      padding-top: 10px;
      display: flex;
      &-item {
        text-align: center;
        flex: 1;
        cursor: pointer;
        &.current {
          background-color: #e4a;
        }
      }
    }
    &-contents {
      height: 370px;
      &-item {
        height: 370px;
        overflow-y: scroll;
        padding: 10px 0;
      }
    }
    &-group {
      &-title {
        padding-left: 30px;
      }
    }
    &-friend {
      display: flex;
      padding-left: 15px;
      align-items: center;
      height: 50px;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
      &-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      &-info {
        margin-left: 9px;
      }
      &-name {
        font-size: 14px;
      }
      &-sign {
        font-size: 12px;
        color: #999;
      }
    }
  }

  .vchat-board-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 155px;
  }
}
</style>
