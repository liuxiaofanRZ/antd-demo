<template>
  <div
    class="vchat-box"
    v-if="isChatBoxOpen"
    :style="{ width: false ? '800px' : '600px' }"
  >
    <div v-if="false" class="sidebar">
      <vchat-card></vchat-card>
      <vchat-list></vchat-list>
    </div>
    <div class="main">
      <vchat-headline></vchat-headline>
      <vchat-message></vchat-message>
      <vchat-text></vchat-text>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('chat')

import vchatCard from './components/card'
import vchatList from './components/list'
import vchatText from './components/text'
import vchatMessage from './components/message'
import vchatHeadline from './components/headline'

export default {
  components: { vchatCard, vchatList, vchatText, vchatMessage, vchatHeadline },
  computed: {
    ...mapState(['isChatBoxOpen']),
  },
}
</script>

<style lang="less">
.vchat-box {
  position: fixed;
  top: 100px;
  left: 100px;
  width: 800px;
  height: 600px;
  box-sizing: content-box;

  overflow: hidden;
  border-radius: 3px;
  border: 1px solid #d9d9d9;

  .sidebar,
  .main {
    height: 100%;
  }
  .sidebar {
    float: left;
    width: 200px;
    color: #f4f4f4;
    background-color: #2e3238;
  }
  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 155px;
  }
}
</style>
