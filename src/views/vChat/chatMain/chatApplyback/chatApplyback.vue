<template>
  <!-- TODO 待完善 -->
  <div class="vchat-applyback">
    <vchat-header
      v-vcdrag="'vchat_main_drag'"
      title="申请结果"
      noClose
      height="60px"
    />
    <div class="vchat-applyback-main">
      <div class="vchat-applyback-readall">
        <a-button
          @click="applybackRead()"
          size="small"
          v-if="newApplyBackCount > 0"
          type="link"
        >
          全部确认已读
        </a-button>
        <span class="vchat-applyback-readall-text" v-else> 全部已读 </span>
      </div>
      <a-list item-layout="horizontal" :data-source="applyBacks">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta>
            <div class="vchat-applyback-msg" slot="title">
              <span class="vchat-applyback-index">{{ index + 1 }}、</span>
              <div class="vchat-applyback-text">
                <div>结果：{{ item.content }}</div>
                <div>申请：{{ item.username }}</div>
              </div>
            </div>
          </a-list-item-meta>
          <template slot="extra">
            <a-button
              v-if="item.isNew"
              type="link"
              size="small"
              @click="applybackRead(index)"
              >确认已读</a-button
            >
            <span v-else style="padding: 0 7px">已读</span>
          </template>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapActions } = createNamespacedHelpers('chat')

import vchatHeader from '../../components/vchatHeader.vue'

export default {
  name: 'chatApplyback',

  components: {
    vchatHeader,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['applyBacks']),
    ...mapGetters(['newApplyBackCount']),
  },
  methods: {
    ...mapActions(['showChat', 'applybackRead']),
  },
}
</script>

<style lang="less">
.vchat-applyback {
  // display: flex;
  height: 100%;
  width: 100%;
  &-main {
    padding: 20px 100px 20px 80px;
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
  &-msg {
    position: relative;
    display: flex;
  }
  &-text {
  }
  &-index {
    width: 40px;
    text-align: right;
  }

  &-readall {
    text-align: right;
    &-text {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      padding: 0 7px;
    }
  }
}
</style>
