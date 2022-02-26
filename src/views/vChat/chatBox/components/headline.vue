<template>
  <div class="headline" id="vchatboxdragbar">
    <div class="ellipsis">
      {{ currentSession.username || currentSession.groupName }}
    </div>
    <vchat-headmenu></vchat-headmenu>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('chat')
import vchatHeadmenu from './headmenu'

export default {
  name: 'headline',
  components: { vchatHeadmenu },
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
