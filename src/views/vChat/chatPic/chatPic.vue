<template>
  <div v-show="isChatPicOpen" v-vcdrag="'vchat_pic_drag'" class="vchat-pic">
    <div @click="TOGGLE_CHAT_PIC()"  class="vchat-pic-close">
      <a-icon type="close"></a-icon>
    </div>
    <img v-if="picSrc" :src="picSrc" alt="" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('chat')
export default {
  name: 'chatPic',
  data() {
    return {}
  },
  computed: {
    ...mapState(['picSrc', 'isChatPicOpen']),
  },
  methods: {
    ...mapMutations(['TOGGLE_CHAT_PIC']),
  },
}
</script>

<style lang="less">
.vchat-pic {
  position: fixed;
  left: 100px;
  top: 200px;
  background-color: #fff;
  z-index: 10;
  max-width: 90%;
  box-shadow: 0 0 5px rgba(0, 0, 0, .2);
  &-close {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #ddd;
    top: -20px;
    right: -20px;
    background-color: #fff;
    cursor: pointer;
    &:hover {
        border-color: #07c160;
        color: #07c160;
    }
  }
  img {
    width: 100%;
  }
}
</style>
