<template>
  <div class="vchat-apply">
    <vchat-header
      v-vcdrag="'vchat_main_drag'"
      title="消息盒子"
      noClose
      height="60px"
    />
    <div class="vchat-apply-main">
      <a-tabs type="card">
        <a-button
          class="vchat-apply-refresh"
          type="link"
          icon="reload"
          @click="init"
          slot="tabBarExtraContent"
        ></a-button>
        <a-tab-pane key="1">
          <div class="vchat-apply-tab-title" slot="tab">
            <span class="tit">好友验证</span>
            <a-badge
              :numberStyle="{ borderRadius: '3px' }"
              :count="friendUntreatedCount"
            />
          </div>
          <div class="vchat-apply-list">
            <a-list item-layout="horizontal" :data-source="friendList">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta
                  :title="item.username + ' ' + item.createTime"
                  :description="'附言：' + item.remark"
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
              <div class="vchat-apply-loadmore" v-if="friendHasNext">
                <a-spin v-if="friendLoading" />
                <a-button v-else @click="getApplyFriendList()">
                  加载更多
                </a-button>
              </div>
              <div class="vchat-apply-loadmore" v-else>暂无更多新消息</div>
            </a-list>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2">
          <div class="vchat-apply-tab-title" slot="tab">
            <span class="tit">群系统消息</span>
            <a-badge
              :numberStyle="{ borderRadius: '3px' }"
              :count="groupUntreatedCount"
            />
          </div>
          <div class="vchat-apply-list">
            <a-list item-layout="horizontal" :data-source="groupList">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta
                  :title="item.username + ' ' + item.createTime"
                  :description="'群名称：' + item.groupname"
                >
                  <a-avatar slot="avatar" :src="item.avatar" icon="user" />
                </a-list-item-meta>
                <div class="vchat-apply-status">
                  <template v-if="item.status === '0'">
                    <a-button
                      @click="agreeGroup(item)"
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
              <div class="vchat-apply-loadmore" v-if="groupHasNext">
                <a-spin v-if="groupLoading" />
                <a-button v-else @click="getApplyGroupList()">
                  加载更多
                </a-button>
              </div>
              <div class="vchat-apply-loadmore" v-else>暂无更多新消息</div>
            </a-list>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('chat')
import {
  queryCharMsgList,
  unAgreeFriend,
  agreeGroup,
  agreeFriend,
} from '@/axios/vChatApi'
import vchatHeader from '../../components/vchatHeader.vue'
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
      friendLoading: false,
      // 申请加群的消息列表
      groupList: [],
      groupPage: 1,
      groupHasNext: true,
      groupUntreatedCount: 0,
      groupLoading: false,

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
  created() {
    this.init()
  },
  computed: {
    ...mapState(['mine', 'friends', 'groups', 'isChatApplyOpen']),
  },
  methods: {
    ...mapMutations({ resetApplyNum: 'UPDATE_NEW_FIND_NUM' }),
    ...mapActions(['showChat', 'sendApplyMsg']),
    init() {
      this.resetApplyNum(0)
      this.getApplyFriendList(true)
      this.getApplyGroupList(true)
    },
    getApplyFriendList(refresh) {
      if (this.friendLoading) return
      if (refresh) {
        this.friendList = []
        this.friendPage = 1
        this.friendHasNext = true
      }
      if (!this.friendHasNext) return
      this.friendLoading = true

      queryCharMsgList({ page: this.friendPage++, type: 'friend' })
        .then((res) => {
          if (res.success) {
            let { pageList, friendCount } = res.result

            if (refresh) {
              this.friendList = pageList.records
            } else {
              this.friendList.push(...pageList.records)
            }
            this.friendHasNext = pageList.current < pageList.pages
            this.friendUntreatedCount = friendCount
          }
        })
        .finally(() => {
          this.friendLoading = false
        })
    },
    getApplyGroupList(refresh) {
      if (this.groupLoading) return
      if (refresh) {
        this.groupList = []
        this.groupPage = 1
        this.groupHasNext = true
      }
      if (!this.groupHasNext) return
      this.groupLoading = true

      queryCharMsgList({ page: this.groupPage++, type: 'group' })
        .then((res) => {
          if (res.success) {
            let { pageList, groupCount } = res.result

            if (refresh) {
              this.groupList = pageList.records
            } else {
              this.groupList.push(...pageList.records)
            }
            this.groupHasNext = pageList.current < pageList.pages
            this.groupUntreatedCount = groupCount
          }
        })
        .finally(() => {
          this.groupLoading = false
        })
    },
    // TODO Tips：拒绝和同意时，需要调用xhr和ws两次接口……醉了
    // 拒绝申请
    unAgreeFriend(item) {
      unAgreeFriend({ id: item.id }).then((res) => {
        if (res == '已拒绝') {
          if (item.msgType == '1') {
            this.friendUntreatedCount--
          } else {
            this.groupUntreatedCount--
          }
          item.status = '2'
          this.$message.success(res)
          this.sendApplyMsg({
            agree: false,
            content: this.mine.username + '拒绝了您的申请',
            id: item.msgForm,
            system: true,
            toId: item.msgTo,
            type: 'friend',
            username: this.mine.username,
          })
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
          this.groupUntreatedCount--

          item.status = '1'
          this.$message.success(res)
          this.sendApplyMsg({
            agree: true,
            content: this.mine.username + '同意了您的申请',
            id: item.msgForm,
            system: true,
            toId: item.groupId,
            type: 'group',
            username: item.groupname,
          })
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
          this.friendUntreatedCount--

          item.status = '1'
          this.$message.success(res)
          this.sendApplyMsg({
            agree: true,
            content: this.mine.username + '同意了您的申请',
            groupid: item.groupId,
            id: item.msgForm,
            system: true,
            toId: item.msgTo,
            type: 'friend',
            username: this.mine.username,
          })
        }
      })
    },
  },
}
</script>

<style lang="less">
.vchat-apply {
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
