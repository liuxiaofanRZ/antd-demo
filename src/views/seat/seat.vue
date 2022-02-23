<template>
  <!-- <span class="seat iconfont icon-kexuanzuowei">
    
  </span> -->
  <span class="seat"></span>
</template>

<script>
export default {
  name: 'seat',
  data() {
    return {}
  },
}
</script>

<style lang="less">
@import './css/iconfont.css';
.seat {
  display: inline-block;
  width: 60px;
  height: 60px;
  // font-size: 60px;
  background: url('./img/seat_bg.png');
  background-size: contain;
  background-color: #000;
}
</style>
