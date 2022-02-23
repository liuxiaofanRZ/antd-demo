<template>
  <div class="message" v-scroll-bottom>
    <div v-if="session">
      <div class="item" v-for="(item, index) in session.messages" :key="index">
        <p class="time">
          <span>{{ item.timestamp | time }}</span>
        </p>
        <div class="main" :class="{ self: item.mine }">
          <img
            class="avatar"
            width="30"
            height="30"
            :src="item.mine ? mine.avatar : session.avatar"
          />
          <div class="text">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('chat')
import Vue from 'vue'
export default {
  computed: {
    ...mapState({
      mine: 'mine',
      session: ({ sessions, currentSession }) =>
        sessions.find((session) => session.id === currentSession.id),
    }),
  },
  filters: {
    // 将日期过滤为 hour:minutes
    time(date) {
      if (date) {
        date = new Date(date)
        return date.getHours() + ':' + date.getMinutes()
      } else {
        return '-'
      }
    },
  },
  directives: {
    // 发送消息后滚动到底部
    'scroll-bottom'(el) {
      Vue.nextTick(() => {
        el.scrollTop = el.scrollHeight - el.clientHeight
      })
    },
  },
}
</script>

<style lang="less" scoped>
.message {
  padding: 10px 15px;
  height: calc(100% - 160px - 60px);

  overflow-y: auto;

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
    padding: 0 10px;
    max-width: ~'calc(100% - 40px)';
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    border-radius: 4px;

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
</style>
