<template>
  <div class="vchat-contextmenu" v-show="visible" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vchatContextmenu',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      left: 0,
      top: 0,
    }
  },
  computed: {
    style() {
      return {
        left: this.left + 1 + 'px',
        top: this.top + 1 + 'px',
      }
    },
  },
  created() {
    window.addEventListener('mousedown', this.closeMenu)
    window.addEventListener('contextmenu', this.setPosition)
  },
  methods: {
    closeMenu() {
      this.$nextTick(() => {
        this.visible && this.$emit('update:visible', false)
      })
    },
    setPosition(e) {
      this.left = e.clientX
      this.top = e.clientY
    },
  },
}
</script>

<style lang="less">
.vchat-contextmenu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
}
</style>
