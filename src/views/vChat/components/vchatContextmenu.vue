<template>
  <div class="vchat-contextmenu" :style="style" v-show="visible">
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
    setPositionTrigger: {
      type: String,
      default: 'contextmenu',
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
    window.addEventListener(this.setPositionTrigger, this.setPosition)
  },
  methods: {
    closeMenu() {
      this.visible && this.$emit('update:visible', false)
      // this.$nextTick(() => {
      // })
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
