<template>
  <div class="vchat-apply" v-if="isChatApplyOpen">
    <vchat-header
      id="vchatapplydragbar"
      title="消息盒子"
      @close="closeChatApply"
    />
    <div class="vchat-apply-main">
      <a-tabs type="card">
        <a-tab-pane key="1" tab="好友验证">
          <a-list
            item-layout="horizontal"
            :data-source="friendList"
            :infinite-scroll-distance="10"
            v-infinite-scroll="getApplyFriendList"
            :infinite-scroll-disabled="!friendHasNext"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                :title="item.username + item.createTime"
                :description="'附言' + item.remark"
              >
                <a-avatar slot="avatar" :src="item.avatar" icon="user" />
              </a-list-item-meta>
              <div class="vchat-apply-status">
                <template v-if="item.status === '0'">
                  <a-button
                    @click="agreeFriend(item)"
                    size="small"
                    class="btn"
                    type="primary"
                  >
                    同意
                  </a-button>
                  <a-popconfirm
                    cancelText="取消"
                    okText="确定"
                    title="确定拒绝吗？"
                    @confirm="unAgreeFriend(item)"
                  >
                    <a-button size="small" class="btn" type="danger">
                      拒绝
                    </a-button>
                  </a-popconfirm>
                </template>
                <template v-else-if="item.status === '1'">已同意</template>
                <template v-else-if="item.status === '2'">已拒绝</template>
              </div>
            </a-list-item>
            <div v-if="friendHasNext">
              <a-spin v-if="loading" />
            </div>
            <div v-else>暂无更多新消息</div>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="2" tab="群系统消息">
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('chat')
import {
  queryCharMsgList,
  unAgreeFriend,
  agreeGroup,
  agreeFriend,
} from '@/axios/vChatApi'
import vchatHeader from '../components/vchatHeader.vue'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  name: 'chatApply',
  directives: { infiniteScroll },

  components: {
    vchatHeader,
  },
  data() {
    return {
      // 申请加好友的消息列表
      friendList: [],
      friendPage: 1,
      friendHasNext: true,
      friendUntreatedCount: 0,
      // 申请加群的消息列表
      groupList: [],
      groupPage: 1,
      groupHasNext: true,
      groupUntreatedCount: 0,

      loading: false,
    }
  },
  watch: {
    isChatApplyOpen: {
      handler(n) {
        n && this.init()
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState(['friends', 'groups', 'isChatApplyOpen']),
  },
  methods: {
    ...mapActions(['closeChatFind', 'closeChatApply']),
    init() {
      this.getApplyFriendList(true)
    },
    getApplyFriendList(refresh) {
      console.log(refresh)
      if (refresh) {
        this.friendPage = 1
        this.friendHasNext = true
      }
      if (!this.friendHasNext) return
      this.loading = true
      queryCharMsgList({ page: this.friendPage++, type: 'friend' })
        .then((res) => {
          if (res.success) {
            let { pageList, friendCount } = res.result
            this.friendList = pageList.records
            this.friendHasNext = pageList.current >= pageList.pages
            this.friendUntreatedCount = friendCount
          }
          console.log(res)
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 拒绝申请
    unAgreeFriend(item) {
      unAgreeFriend({ id: item.id }).then((res) => {
        if (res == '已拒绝') {
          item.status = '2'
          this.$message.success(res)
        }
      })
    },
    // 同意群申请
    agreeGroup(item) {
      agreeGroup({
        id: item.id,
        msgForm: item.msgForm,
        groupId: item.groupId,
      }).then((res) => {
        if (res == '添加成功') {
          item.status = '1'
          this.$message.success(res)
        }
      })
    },

    // 同意群申请
    agreeFriend(item) {
      agreeFriend({
        id: item.id,
        msgForm: item.msgForm,
        groupId: this.friends[0].id, // 默认是我的好友第一个分组
        msgTo: item.msgTo,
        friendGroupId: item.groupId,
      }).then((res) => {
        if (res == '添加成功') {
          item.status = '1'
          this.$message.success(res)
        }
      })
    },
  },
}
</script>

<style lang="less">
.vchat-apply {
  position: fixed;
  top: 100px;
  left: 100px;
  width: 1000px;
  // height: 600px;
  box-sizing: content-box;
  background-color: #fff;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid #d9d9d9;
  &-main {
    padding: 20px;
  }
  &-status {
    padding: 0 20px;
    .btn {
      margin-left: 10px;
    }
  }
}
</style>
