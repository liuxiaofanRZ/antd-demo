<template>
  <div class="vchat-btn" @click="showChat">
    <a-badge :count="newSessionCount" :numberStyle="numberStyle">
      <a-icon :style="iconStyle" type="message" />
    </a-badge>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('chat')

export default {
  name: 'chatBtn',
  data() {
    return {
      iconStyle: {
        fontSize: '35px',
      },
      numberStyle: {
        minWidth: '18px',
        padding: '0',
        height: '18px',
        lineHeight: '17px',
        boxShadow: 'none',
      },
    }
  },
  computed: {
    ...mapGetters(['newSessionCount']),
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
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  transition: transform 0.3s;
  color: #129611;
  &:hover {
    transform: scale(1.1);
    color: #1aad19;
  }
  &:active {
    background-color: #f5f5f5;
  }
}
</style>
