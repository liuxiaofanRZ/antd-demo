<template>
  <div class="vchat-history" v-show="isChatHistoryOpen">
    <vchat-header
      v-vcdrag="'vchat_history_drag'"
      :title="'聊天记录：' + curHistoryInfo.name"
      @close="closeChatHistory"
    />
    <a-spin :spinning="loading">
      <div class="vchat-history-message" v-vc-scroll-bottom>
        <div class="item" v-for="(item, index) in list" :key="index">
          <p class="time">
            <span>{{ item.sendTime }}</span>
          </p>
          <div class="main" :class="{ self: item.msgFrom === mine.id }">
            <a-avatar
              class="avatar"
              :alt="item.fromUserName"
              :src="item.fromAvatar"
              icon="user"
            />
            <!-- <div v-html="transferMessage(item.content)" class="text"></div> -->
            <div v-html="transferMessage(item.msgData)" class="text">
              {{ item.msgData }}
            </div>
          </div>
        </div>
        <a-empty description="无数据" style="margin-top:100px" v-if="!loading && list.length <= 0" />
      </div>
    </a-spin>
    <div class="vchat-history-pagination">
      <a-pagination
        size="small"
        :v-model="current"
        @change="queryChatLogList"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('chat')
import vchatHeader from '../components/vchatHeader.vue'
import { queryChatLogList } from '@/axios/vChatApi'

import { transferMessage, vcScrollBottom } from '../js/util'

export default {
  name: 'chatHistory',
  components: { vchatHeader },
  data() {
    return {
      list: [],
      total: 0,
      current: 1,
      loading: false,
    }
  },
  watch: {
    curHistoryInfo: {
      handler(n, o) {
        if (this.isChatHistoryOpen && n.id && n.id != o.id) {
          this.init()
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState(['mine', 'curHistoryInfo', 'isChatHistoryOpen']),
  },
  methods: {
    ...mapActions(['closeChatHistory']),
    transferMessage,
    init() {
      this.current = 1
      this.queryChatLogList()
    },
    queryChatLogList(page) {
      if (this.loading) return
      this.loading = true
      let params = {
        ...this.curHistoryInfo,
        pageNo: page,
      }
      queryChatLogList(params)
        .then((res) => {
          if (res.success) {
            this.list = res.result.records
            this.total = res.result.total
            this.current = res.result.current
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  directives: {
    vcScrollBottom,
  },
}
</script>

<style lang="less">
.vchat-history {
  position: fixed;
  top: 100px;
  left: 100px;
  width: 600px;
  height: 600px;
  box-sizing: content-box;
  background-color: #fff;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid #d9d9d9;
  &-message {
    background-color: #f5f5f5;
    height: 520px;
    padding: 10px 15px;
    overflow-y: auto;
    box-sizing: border-box;
    border-top: 1px solid #d9d9d9;
    // border-bottom: 1px solid #d9d9d9;

    .item {
      margin-bottom: 15px;
    }
    .time {
      margin: 7px 0;
      text-align: center;

      > span {
        display: inline-block;
        padding: 0 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
      }
    }
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
    }
    .text {
      display: inline-block;
      position: relative;
      padding: 8px 15px;
      max-width: ~'calc(100% - 150px)';
      min-height: 30px;
      // line-height: 2.5;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background-color: #fff;
      border-radius: 4px;
      white-space: pre-line;
      &:before {
        content: ' ';
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
      }
    }

    .self {
      text-align: right;

      .avatar {
        float: right;
        margin: 0 0 0 10px;
      }
      .text {
        background-color: #b2e281;

        &:before {
          right: inherit;
          left: 100%;
          border-right-color: transparent;
          border-left-color: #b2e281;
        }
      }
    }
  }
  &-pagination {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
