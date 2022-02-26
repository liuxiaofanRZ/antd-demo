<template>
  <div class="headmenu">
    <div class="headmenu-item" @click="closeChatBox">
      <a-icon type="close" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('chat')

export default {
  name: 'headmenu',
  data() {
    return {}
  },
  methods: {
    ...mapActions(['closeChatBox']),
  },
}
</script>

<style lang="less" scoped>
.headmenu {
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  height: 40px;
  line-height: 40px;
  &-item {
    margin: 0 10px;
    cursor: pointer;
  }
}
</style>
