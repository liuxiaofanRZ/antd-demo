<template>
  <div class="boxToChoose" ref="box"></div>
</template>

<script>
export default {
  name: 'boxToChoose',
  data() {
    return {
      box: null,
    }
  },
  mounted() {
    this.box = this.$refs.box
    console.log(this.box)
  },
}
</script>

<style lang="less">
.boxToChoose {
}
</style>
