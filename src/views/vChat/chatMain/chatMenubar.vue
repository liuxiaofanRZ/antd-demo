<template>
  <div class="vchat-menubar">
    <div class="vchat-menubar-avatar">
      <a-avatar
        @click="infoVisible = true"
        shape="square"
        size="large"
        :alt="mine.username"
        :src="mine.avatar"
        icon="user"
        :title="mine.username"
      />
    </div>
    <div class="vchat-menubar-tabs">
      <div
        class="vchat-menubar-tab"
        v-for="(tab, key) in moduleTabs"
        :key="tab.item"
        :title="tab.title"
        @click="setModule(key)"
      >
        <template v-if="key === 'session'">
          <a-badge :count="newSessionCount" :numberStyle="numberStyle">
            <i
              v-if="curModule == key"
              class="iconfont b"
              :class="tab.iconB"
            ></i>
            <i v-else class="iconfont a" :class="tab.iconA"></i>
          </a-badge>
        </template>
        <template v-else-if="key === 'addresslist'">
          <a-badge dot :count="tab.newMsgCount">
            <i
              style="font-size: 22px"
              v-if="curModule == key"
              class="iconfont b"
              :class="tab.iconB"
            ></i>
            <i
              style="font-size: 22px"
              v-else
              class="iconfont a"
              :class="tab.iconA"
            ></i>
          </a-badge>
        </template>
        <template v-else-if="key === 'applyBack'">
          <a-badge :count="newApplyBackCount" :numberStyle="numberStyle">
            <i
              v-if="curModule == key"
              class="iconfont b"
              :class="tab.iconB"
            ></i>
            <i v-else class="iconfont a" :class="tab.iconA"></i>
          </a-badge>
        </template>
        <template v-else>
          <a-badge dot :count="tab.newMsgCount">
            <i
              v-if="curModule == key"
              class="iconfont b"
              :class="tab.iconB"
            ></i>
            <i v-else class="iconfont a" :class="tab.iconA"></i>
          </a-badge>
        </template>
      </div>
    </div>

    <vchat-contextmenu
      set-position-trigger="mousedown"
      :visible.sync="infoVisible"
    >
      <div @mousedown.stop class="vchat-menubar-info">
        <div class="vchat-menubar-info-item user">
          <span>{{ mine.username }}</span>
          <a-avatar
            icon="user"
            shape="square"
            :size="50"
            :src="mine.avatar"
          ></a-avatar>
        </div>
        <div class="vchat-line"></div>
        <div class="vchat-menubar-info-item sign">
          <span class="vchat-menubar-info-label">签名：</span>
          <textarea
            class="vchat-menubar-info-input"
            placeholder="无签名……"
            v-model="mine.sign"
            type="text"
            @blur="(e) => updateSign(e.target.value)"
          />
        </div>
      </div>
    </vchat-contextmenu>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('chat')
import vchatContextmenu from '../components/vchatContextmenu.vue'

export default {
  name: 'chatMenubar',
  components: { vchatContextmenu },
  data() {
    return {
      numberStyle: {
        minWidth: '18px',
        padding: '0',
        height: '18px',
        lineHeight: '17px',
        boxShadow: 'none',
      },
      infoVisible: false,
    }
  },
  computed: {
    ...mapState(['mine', 'curModule', 'moduleTabs']),
    ...mapGetters(['newSessionCount', 'newApplyBackCount']),
  },
  methods: {
    ...mapActions(['setModule', 'updateSign']),
  },
}
</script>

<style lang="less">
.vchat-menubar {
  width: 100%;
  height: 100%;
  background-color: #2e2e2e;

  &-avatar {
    line-height: 80px;
    padding-top: 10px;
    text-align: center;
    cursor: pointer;
    .ant-avatar {
      border-radius: 0;
    }
  }
  &-tabs {
  }
  &-tab {
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    .iconfont {
      font-size: 20px;
    }
    .a {
      color: #7e7e7e;
    }
    .b {
      color: #07c160;
    }
    &:hover .a {
      color: #a3a3a3;
      // color: #07c160;
    }
  }
  &-info {
    width: 295px;
    max-height: 500px;
    padding: 30px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

    &-item {
      display: flex;
      &.user {
        justify-content: space-between;
      }
    }
    &-label {
      flex: none;
    }
    &-input {
      border: 1px solid transparent;
      outline: 0;
      margin-top: -2px;
      &:hover,
      &:focus {
        border-color: #ddd;
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
