<template>
  <div class="message" v-vc-scroll-bottom>
    <div v-if="session">
      <div class="more" v-if="session.hasMore"><span>查看更多记录</span></div>
      <div class="item" v-for="(item, index) in session.messages" :key="index">
        <div class="main" :class="{ self: item.mine }">
          <a-avatar
            class="avatar"
            :alt="item.username"
            :src="item.avatar"
            icon="user"
          />
          <!-- <div v-html="transferMessage(item.content)" class="text"></div> -->
          <div class="msg">
            <div class="user">
              <span>{{ item.username }}</span>
              <span class="time">{{ item.timestamp | time }}</span>
            </div>
            <div
              @dblclick="picPreview"
              v-html="transferMessage(item.content)"
              class="text"
            >
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('chat')
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
    ...mapMutations(['TOGGLE_CHAT_PIC']),
    transferMessage,
    picPreview({ target }) {
      if (target.className === 'vchat-img') {
        this.TOGGLE_CHAT_PIC(target.src)
      }
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
  padding: 15px;
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
    padding: 0 15px;
  }
  .avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
  }
  .msg {
    display: inline-block;
    font-size: 14px;
    max-width: ~'calc(100% - 150px)';
  }
  .user {
    font-size: 12px;
    color: #999;
    line-height: 24px;
    margin-top: -6px;
    display: flex;
  }
  .text {
    display: inline-block;
    position: relative;
    padding: 5px 10px;
    // min-height: 30px;
    // line-height: 2.5;
    text-align: left;
    word-break: break-all;
    background-color: #fff;
    border-radius: 4px;
    white-space: pre-line;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    &:hover {
      background-color: #f6f6f6;
      &::before {
        border-right-color: #f6f6f6;
      }
    }
    &:before {
      content: ' ';
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fff;
    }
  }

  .self {
    text-align: right;
    .user {
      justify-content: end;
      flex-direction: row-reverse;
    }
    .avatar {
      float: right;
      margin: 0 0 0 10px;
    }
    .text {
      background-color: #9eea6a;
      &:hover {
        background-color: #98e165;
        &::before {
          border-left-color: #98e165;
        }
      }

      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #9eea6a;
      }
    }
  }
}
</style>
