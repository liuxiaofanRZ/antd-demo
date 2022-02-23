<template>
  <div class="appHeader">
    <h2>Practices</h2>
  </div>
</template>

<script>
export default {
  name: 'appHeader',
}
</script>

<style lang="less">
.appHeader {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 30px 10px 60px;
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;
  z-index: 50;
  &-title {
    line-height: 40px;
    font-size: 20px;
    color: #000;
  }
}
</style>
