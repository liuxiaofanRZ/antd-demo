<template>
  <div class="vchat-session">
    <div class="vchat-session-left">
      <vchat-board></vchat-board>
    </div>
    <div class="vchat-session-right">
      <vchat-window></vchat-window>
    </div>
  </div>
</template>

<script>
import vchatBoard from './components/chatBoard.vue'
import vchatWindow from './components/chatWindow.vue'
export default {
  name: 'chatSession',
  components: {
    vchatBoard,
    vchatWindow,
  },
  data() {
    return {}
  },
}
</script>

<style lang="less">
.vchat-session {
  display: flex;
  height: 100%;
  width: 100%;
  &-left,
  &-right {
    height: 100%;
  }
  &-left {
    width: 250px;
    flex: none;
  }
  &-right {
    width: calc(100% - 250px);
  }
}
</style>
