<template>
  <div class="seatIndex">
    <seat></seat>
  </div>
</template>

<script>
import seat from './seat.vue'
export default {
  name: 'seatIndex',
  components: { seat },
  data() {
    return {}
  },
}
</script>

<style lang="less">
.seatIndex {
}
</style>
