<template>
  <div class="message" v-vc-scroll-bottom>
    <div v-if="session">
      <div class="more" v-if="session.hasMore"><span>查看更多记录</span></div>
      <div class="item" v-for="(item, index) in session.messages" :key="index">
        <p class="time">
          <span>{{ item.timestamp | time }}</span>
        </p>
        <div class="main" :class="{ self: item.mine }">
          <a-avatar
            class="avatar"
            :alt="item.username"
            :src="item.avatar"
            icon="user"
          />
          <!-- <div v-html="transferMessage(item.content)" class="text"></div> -->
          <div v-html="transferMessage(item.content)" class="text">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('chat')
import faceArray from '../../../js/faceArray'
import { transferMessage, vcScrollBottom } from '../../../js/util'

export default {
  computed: {
    ...mapState({
      mine: 'mine',
      session: ({ sessions, curSession }) =>
        sessions.find((session) => session.id === curSession.id),
    }),
  },
  data() {
    return {
      faceArray,
    }
  },
  methods: {
    transferMessage,
    imgLoaded(e) {
      console.log('img', e)
    },
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
    vcScrollBottom,
  },
}
</script>

<style lang="less" scoped>
.message {
  padding: 10px 15px;
  height: calc(100% - 200px - 60px);

  overflow-y: auto;
  .more {
    text-align: center;
    padding: 15px 0;
    > span {
      display: inline-block;
      line-height: 30px;
      padding: 0 15px;
      border-radius: 3px;
      background-color: #e2e2e2;
      cursor: pointer;
      font-size: 14px;
    }
  }
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
</style>
