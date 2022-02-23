<template>
  <div class="appMain">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'appMain',
  data() {
    return {}
  },
}
</script>

<style lang="less">
.appMain {
  padding: 60px 50px;
  margin-left: 300px;
  .container {
    padding-top: 20px;
    margin: 0 auto;
  }
}
</style>
