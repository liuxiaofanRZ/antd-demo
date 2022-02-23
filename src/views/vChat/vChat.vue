<template>
  <div v-if="token" class="vchat">
    <div class="vchat-box-small">
      <img class="vchat-box-avatar" :src="mine.avatar" alt="">
      <span class="vchat-box-title">我的聊天</span>
    </div>
  </div>
</template>

<script>
import { getList } from './vChatApi/index'
import { mapState } from 'vuex'
export default {
  name: 'vChat',
  data() {
    return {
      mine:{}
    }
  },
  computed: { ...mapState(['token', 'info']) },
  watch: {
    token(token) {
      if (token) {
        this.init()
      }
    },
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      getList({ userId: this.info.id, token: this.token }).then((res) => {
        this.mine = res.data.mine
      })
    },
  },
}
</script>

<style lang="less">
.vchat {
  position: fixed;
  right: 0;
  bottom: 0;
  font-size: 16px;
  color: #000;
  &-box {
    
    &-small{
      width: 145px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      border: 1px solid #D9D9D9;
      border-radius: 2px;
      cursor: pointer;
    }
    &-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    &-title {
      padding-left: 10px;
    }
  }
}
</style>
