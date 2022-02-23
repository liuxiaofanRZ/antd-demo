<template>
  <div class="tmp">
    <slot></slot>
    <button @click="show">show</button>
  </div>
</template>

<script>
export default {
  name: 'tmp',
  data() {
    return {}
  },
  watch: {
    '$slots.default': {
      handler(v) {
        console.log(v)
      },

      immediate: true,
    },
  },
  methods: {
    show() {
      console.log(this.$slots.default)
    },
  },
}
</script>

<style lang="less">
// .tmp {

// }
</style>
