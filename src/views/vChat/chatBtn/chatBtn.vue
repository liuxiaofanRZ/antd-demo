<template>
  <div class="vchat-btn" @click="showChat">
    <a-icon :style="iconStyle" type="message" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('chat')

export default {
  name: 'chatBtn',
  data() {
    return {
      iconStyle: {
        fontSize: '40px',
      },
    }
  },
  methods: {
    ...mapActions(['showChat']),
  },
}
</script>

<style lang="less">
.vchat-btn {
  position: fixed;
  right: 50px;
  bottom: 80px;
  cursor: pointer;
  background-color: #4ae;
  padding: 20px;
  border-radius: 50%;
}
</style>
