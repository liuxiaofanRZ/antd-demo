<template>
  <div class="vchat-board">
    <!-- 聊天菜单 -->
    <div class="vchat-board-search">
      <a-input
        ref="userNameInput"
        v-model="searchValue"
        placeholder="搜索"
        size="small"
        allow-clear
      >
        <a-icon slot="prefix" type="search" />
      </a-input>
    </div>
    <div class="vchat-board-main">
      <div
        class="vchat-board-session"
        @click="openChatBox(s)"
        v-for="s in sessions"
        :key="s.id"
        :class="{ select: s.id == curSession.id }"
        @contextmenu.prevent="contextmenu(s)"
      >
        <a-badge :numberStyle="numberStyle" :count="s.newMsgCount">
          <a-avatar
            shape="square"
            :size="36"
            :src="s.avatar"
            alt="头像"
            icon="user"
          />
        </a-badge>

        <div class="vchat-board-session-info">
          <div class="vchat-board-session-name vchat-board-ellipsis">
            {{ s.username || s.groupName }}
          </div>
          <div class="vchat-board-session-sign vchat-board-ellipsis">
            {{ s.sign || s.groupIntroduce }}
          </div>
        </div>
      </div>
    </div>
    <vchat-contextmenu :visible.sync="contextmenuVisible">
      <div class="vchat-board-ctx">
        <div
          class="vchat-board-ctx-item"
          @mousedown="removeSession(curMenuItem.id)"
        >
          删除该会话
        </div>
        <div class="vchat-board-ctx-item" @mousedown="removeSession()">
          清空会话列表
        </div>
      </div>
    </vchat-contextmenu>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('chat')

import vchatContextmenu from '../../../components/vchatContextmenu.vue'

export default {
  name: 'chatBoard',
  components: {
    vchatContextmenu,
  },
  data() {
    return {
      contextmenuVisible: false,
      searchValue: '',
      numberStyle: {
        minWidth: '18px',
        padding: '0',
        height: '18px',
        lineHeight: '17px',
        boxShadow: 'none',
      },
    }
  },
  computed: {
    ...mapState({
      sessions(state) {
        if (this.searchValue) {
          return state.sessions.filter(
            (session) =>
              (session.type ? session.groupName : session.username).indexOf(
                this.searchValue,
              ) >= 0,
          )
        } else {
          return state.sessions
        }
      },
      curSession: 'curSession',
    }),
  },

  methods: {
    ...mapActions(['openChatBox', 'removeSession']),
    contextmenu(item) {
      this.curMenuItem = item
      this.contextmenuVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
.vchat-board {
  width: 100%;
  height: 100%;
  border-right: 1px solid #d9d9d9;
  background-color: #eee;

  &-search {
    padding: 22px 12px 0;
    height: 59px;
    background-color: #f7f7f7;
    box-sizing: border-box;
  }
  // 内容
  &-main {
    height: calc(100% - 59px);
  }
  &-session {
    display: flex;
    padding-left: 15px;
    align-items: center;
    height: 60px;
    cursor: default;
    &:hover {
      background-color: #d8d8d8;
    }
    &-info {
      margin-left: 9px;
    }
    &-name {
      font-size: 14px;
      height: 19px;
    }
    &-sign {
      font-size: 12px;
      line-height: 18px;
      height: 18px;
      color: #999;
    }
    &.select {
      background-color: #c5c5c5;
    }
  }
  // 菜单
  &-ctx {
    background-color: #fff;
    box-shadow: 2px 2px 10px #aaa;
    border-radius: 2px;
    overflow: hidden;
    font-size: 12px;
    line-height: 25px;
    &-item {
      padding: 0 25px;
      cursor: default;
      &:hover {
        background-color: #e2e2e2;
      }
    }
  }
}
</style>
