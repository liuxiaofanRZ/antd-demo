<template>
  <div class="vchat-board" @contextmenu.prevent>
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
          <input
            maxlength="50"
            @blur="(e) => updateSign(e.target.value)"
            :value="mine.sign"
            class="sign sign-input"
          />
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
            <!-- <span>{{ tab.title }}</span> -->
            <a-icon
              style="font-size: 24px"
              :title="tab.title"
              :type="tab.icon"
            />
          </div>
        </div>
        <div class="vchat-board-contents">
          <div
            class="vchat-board-contents-item"
            v-if="vChatBoxTabsCurrentId === 1"
          >
            <div
              class="vchat-board-group"
              v-for="fgroup in friends"
              :key="fgroup.id"
            >
              <div class="vchat-board-group-title vchat-board-ellipsis">
                {{ fgroup.groupname }}
              </div>
              <div
                class="vchat-board-friend"
                @click="openChatBox(f)"
                v-for="f in fgroup.list"
                :key="f.id"
              >
                <a-avatar :size="36" :src="f.avatar" alt="头像" icon="user" />

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
            <div
              class="vchat-board-friend"
              @click="openChatBox(g)"
              v-for="g in groups"
              :key="g.id"
            >
              <a-avatar :size="36" :src="g.avatar" alt="群头像" icon="team" />

              <div class="vchat-board-friend-info">
                <div class="vchat-board-friend-name vchat-board-ellipsis">
                  {{ g.groupName }}
                </div>
                <div class="vchat-board-friend-sign vchat-board-ellipsis">
                  {{ g.groupIntroduce }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="vchat-board-contents-item"
            v-if="vChatBoxTabsCurrentId === 3"
          >
            <div
              class="vchat-board-friend"
              @click="openChatBox(s)"
              v-for="s in sessions"
              :key="s.id"
            >
              <a-avatar :size="36" :src="s.avatar" alt="头像" icon="user" />

              <div class="vchat-board-friend-info">
                <div class="vchat-board-friend-name vchat-board-ellipsis">
                  {{ s.username || s.groupName }}
                </div>
                <div class="vchat-board-friend-sign vchat-board-ellipsis">
                  {{ s.sign || s.groupIntroduce }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vchat-board-menu">
        <div class="vchat-board-menu-item" @click="openChatApply">
          <a-badge dot :count="newFindNum">
            <a-icon type="notification" />
          </a-badge>
        </div>
        <div class="vchat-board-menu-item" @click="openChatFind">
          <a-icon type="plus-circle" />
        </div>
        <div class="vchat-board-menu-item"><a-icon type="info-circle" /></div>
      </div>
    </div>
    <div v-else class="vchat-board-small" @click="isOpen = true">
      <img class="vchat-board-avatar" :src="mine.avatar" alt="" />
      <span class="vchat-board-title">我的聊天</span>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapActionsChat, mapState: mapStateChat } =
  createNamespacedHelpers('chat')

export default {
  name: 'vChat',
  data() {
    return {
      isOpen: false,
      vChatBoxTabs: [
        {
          title: '我的好友',
          icon: 'user',
          id: 1,
        },
        {
          title: '通讯录',
          icon: 'team',
          id: 2,
        },
        {
          title: '历史会话',
          icon: 'message',
          id: 3,
        },
      ],
      vChatBoxTabsCurrentId: 1,
    }
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
  computed: {
    ...mapStateChat(['mine', 'friends', 'groups', 'sessions', 'newFindNum']),
  },

  methods: {
    ...mapActionsChat([
      'openChatBox',
      'openChatFind',
      'openChatApply',
      'getInitChatInfo',
      'receiveMessage',
      'updateSign',
    ]),
  },
  created() {
    this.getInitChatInfo()
  },
}
</script>

<style lang="less" scoped>
@import url('../iconfont/iconfont.css');

@border: 1px solid #d9d9d9;
@borderRadius: 2px;
.vchat-board {
  // 小
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
  // 大
  &-big {
    width: 260px;
    height: 520px;
    z-index: 99998;
    border: @border;
    border-radius: borderRadius;
    background-image: url('../img/chat_menu_bg.jpg');
  }
  &-info {
    padding: 10px 12px 0;
    height: 60px;
  }
  &-user {
    display: flex;
    padding-left: 3px;
  }
  &-sign {
    height: 26px;
    .sign {
      height: 100%;
      background: transparent;
      border: none;
      outline: none;
      border: 1px solid transparent;
      width: 100%;
      &:hover {
        border-color: rgba(0, 0, 0, 0.15);
      }
      &:focus {
        border-color: rgba(0, 0, 0, 0.15);
        background-color: #fff;
      }
    }
  }
  &-name {
    max-width: 150px;
  }
  // 内容
  &-main {
    height: 420px;
  }
  &-tabs {
    height: 50px;
    padding-top: 10px;
    display: flex;
    &-item {
      text-align: center;
      line-height: 40px;
      flex: 1;
      position: relative;
      cursor: pointer;
      &.current::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #3fdd86;
      }
    }
  }
  &-contents {
    height: 370px;
    background-color: rgba(255, 255, 255, 0.9);
    &-item {
      height: 370px;
      overflow-y: auto;
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
      cursor: pointer;
      .anticon {
        font-size: 22px;
      }
    }
  }
}
</style>
