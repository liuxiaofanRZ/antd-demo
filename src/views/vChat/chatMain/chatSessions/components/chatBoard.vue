<template>
  <div class="vchat-board">
    <!-- 聊天菜单 -->
    <div class="vchat-board-search">查询</div>
    <div class="vchat-board-main">
      <div
        class="vchat-board-session"
        @click="openChatBox(s)"
        v-for="(s, index) in sessions"
        :key="s.id"
        :class="{ select: s.id == curSession.id }"
        @contextmenu.prevent="contextmenu(index)"
      >
        <a-avatar
          shape="square"
          :size="36"
          :src="s.avatar"
          alt="头像"
          icon="user"
        />

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
      <div style="cursor: pointer" @mousedown="removeSession(curIndex)">
        删除会话
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
    return { contextmenuVisible: false }
  },
  computed: {
    ...mapState(['sessions', 'curSession']),
  },

  methods: {
    ...mapActions(['openChatBox', 'removeSession']),
    contextmenu(index) {
      this.curIndex = index
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
    padding: 10px 12px 0;
    height: 59px;
    background-color: #fff;
    // border-bottom: 1px solid #d9d9d9;
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
  &-menu {
    height: 40px;
    line-height: 40px;
    background-color: #f6f6f6;
    display: flex;
    font-size: 22px;
    &-item {
      margin: 0 10px;
      .anticon {
        font-size: 22px;
      }
    }
  }
}
</style>
