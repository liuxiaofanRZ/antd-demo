<template>
  <div class="headline">
    <div class="ellipsis">{{ currentSession.username }}</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('chat')
export default {
  name: 'headline',
  data() {
    return {}
  },
  computed: {
    ...mapState(['currentSession']),
  },
}
</script>

<style lang="less" scoped>
.headline {
  height: 60px;
  line-height: 60px;
  padding-left: 30px;
  border-bottom: 1px solid #d9d9d9;
}
</style>
