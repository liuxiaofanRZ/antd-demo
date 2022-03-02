<template>
  <div class="vchat-menubar">
    <div class="vchat-menubar-avatar">
      <a-avatar
        shape="square"
        size="large"
        :alt="mine.username"
        :src="mine.avatar"
        icon="user"
      />
    </div>
    <div class="vchat-meunbar-tabs">
      <div
        class="vchat-menubar-tab"
        v-for="(tab, key) in moduleTabs"
        :key="tab.item"
        :title="tab.title"
        :class="{ select: curModule == key }"
        @click="setModule(key)"
      >
        <template v-if="key === 'session'">
          <a-badge :count="newSessionCount" :numberStyle="numberStyle">
            <a-icon class="vchat-menubar-tab-icon" :type="tab.icon" />
          </a-badge>
        </template>
        <template v-else-if="key === 'applyBack'">
          <a-badge :count="newApplyBackCount" :numberStyle="numberStyle">
            <a-icon class="vchat-menubar-tab-icon" :type="tab.icon" />
          </a-badge>
        </template>
        <template v-else>
          <a-badge dot :count="tab.newMsgCount">
            <a-icon class="vchat-menubar-tab-icon" :type="tab.icon" />
          </a-badge>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('chat')
export default {
  name: 'chatMenubar',
  data() {
    return {
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
    ...mapState(['mine', 'curModule', 'moduleTabs']),
    ...mapGetters(['newSessionCount', 'newApplyBackCount']),
  },
  methods: {
    ...mapActions(['setModule']),
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
    .ant-avatar {
      border-radius: 0;
    }
  }
  &-tabs {
  }
  &-tab {
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    color: #7e7e7e;
    cursor: pointer;
    &-icon {
      font-size: 20px;
    }
    &:hover {
      color: #a3a3a3;
    }
    &.select {
      color: #07c160;
    }
  }
}
</style>
