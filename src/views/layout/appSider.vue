<template>
  <div class="appSider">
    <div class="box">
      <div class="list">
        <router-link
          class="item"
          v-for="route in routes"
          :key="route.name"
          tag="div"
          :to="route.path"
          ><a :href="route.path">{{ route.name }}</a></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { routes } from '@/router/index'
export default {
  data() {
    return {
      routes,
    }
  },
}
</script>

<style lang="less">
.appSider {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 300px;
  // height: 100vh;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  .box {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .list {
    overflow-y: auto;
    flex: 1;
  }
  .item {
    height: 30px;
    display: flex;
    align-items: center;
    color: #2c3e50;
    padding: 0 20px;
    border-left: 4px solid transparent;
    a {
      color: inherit;
      transition: none;
      &:hover {
        color: #3eaf7c;
      }
    }
    &.router-link-exact-active {
      color: #3eaf7c;
      border-left: 4px solid #3eaf7c;
    }
  }
}
</style>
