<template>
  <div class="vchat-window">
    <vchat-headline  v-vcdrag="'vchat_main_drag'"></vchat-headline>
    <template v-if="curSession.id">
      <vchat-message></vchat-message>
      <vchat-text></vchat-text>
    </template>
    <div v-else class="vchat-window-empty">
      <a-icon  :style="{fontSize:'80px',color: '#ddd'}" type="message" />
    </div>
  </div>
</template>

<script>
import vchatText from './text'
import vchatMessage from './message'
import vchatHeadline from './headline'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('chat')
export default {
  name: 'chatWindow',
  components: {
    vchatText,
    vchatMessage,
    vchatHeadline,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['curSession']),
  },
}
</script>

<style lang="less">
.vchat-window {
  height: 100%;
  background-color: #f5f5f5;
  &-empty {
    height: calc(100% - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
