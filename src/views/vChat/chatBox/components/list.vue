<template>
  <div class="list">
    <div
      class="item"
      v-for="item in sessions"
      :class="{ active: item.id === curSession.id }"
      :key="item.id"
      @click="selectSession(item.id)"
    >
      <img
        class="avatar"
        width="30"
        height="30"
        :alt="item.user.name"
        :src="item.user.img"
      />
      <p class="name">{{ item.user.name }}</p>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('chat')

export default {
  computed: {
    ...mapState(['sessions', 'curSession']),
  },
  methods: {
    ...mapActions(['selectSession']),
  },
}
</script>

<style scoped lang="less">
.list {
  .item {
    padding: 12px 15px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    transition: background-color 0.1s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
    &.active {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  .avatar,
  .name {
    vertical-align: middle;
  }
  .avatar {
    border-radius: 2px;
  }
  .name {
    display: inline-block;
    margin: 0 0 0 15px;
  }
}
</style>
