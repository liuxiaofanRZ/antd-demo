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
        v-for="tab in tabs"
        :key="tab.item"
        :title="tab.title"
        :class="{ select: curModule == tab.id }"
        @click="setModule(tab.id)"
      >
        <a-icon :type="tab.icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('chat')
export default {
  name: 'chatMenubar',
  data() {
    return {
      tabs: [
        {
          title: '聊天',
          icon: 'message',
          id: 'session',
        },
        {
          title: '通讯录',
          icon: 'team',
          id: 'addresslist',
        },
      ],
      curId: 1,
    }
  },
  computed: {
    ...mapState(['mine', 'curModule']),
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
    &:hover {
      color: #a3a3a3;
    }
    &.select {
      color: #07c160;
    }
  }
}
</style>
