<template>
<!-- TODO 待完善 -->
  <div class="vchat-applyback">
    <vchat-header
      v-vcdrag="'vchat_main_drag'"
      title="回复消息"
      @close="closeChatApply"
    />
    <div class="vchat-applyback-main">
      <div v-for="ab in applyBacks" :key="ab.id">
        {{ ab.username }}-{{ ab.content }}
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('chat')

import vchatHeader from '../../components/vchatHeader.vue'

export default {
  name: 'chatApplyback',


  components: {
    vchatHeader,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['applyBacks']),
  },
  methods: {},
}
</script>

<style lang="less">
.vchat-applyback {
  // display: flex;
  height: 100%;
  width: 100%;
  &-main {
    padding: 20px;
    position: relative;
  }
  &-list {
    height: calc(100% - 40px);
    overflow: auto;
  }
  &-status {
    padding: 0 20px;
    .btn {
      margin-left: 10px;
    }
  }
  &-loadmore {
    text-align: center;
    height: 40px;
  }
  &-refresh {
    &:hover {
      background-color: #eee !important;
    }
  }
  &-tab-title {
    font-size: 16px;
    .tit {
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
</style>
