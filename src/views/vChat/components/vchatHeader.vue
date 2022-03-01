<template>
  <div class="vchat-header">
    <div class="vchat-header-left">
      <div class="vchat-header-title">{{ title }}</div>
    </div>
    <div class="vchat-header-middle"></div>
    <div class="vchat-header-right">
      <div class="vchat-header-menu">
        <!-- <div class="vchat-header-menu-item"></div>
            <div class="vchat-header-menu-item"></div> -->
        <div class="vchat-header-menu-item" @click="$emit('close')">
          <a-icon type="close" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vchatHeader',
  props: {
    title: String,
  },
}
</script>

<style lang="less">
.vchat-header {
  display: flex;
  padding: 0 10px;
  height: 40px;
  align-items: center;
  background-color: rgba(245, 245, 245, 0.7);
  &-left,
  &-middle,
  &-right {
    flex: none;
  }
  &-middle {
    flex: 1;
  }
  &-title {
    padding: 0 5px;
  }
  &-menu {
    display: flex;
    &-item {
      margin: 0 5px;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
</style>
