<template>
  <div draggable="true" class="home">
    Hello World!

    <tmp>
      <div v-for="n in num" :key="n">{{ n }}</div>
    </tmp>
    <button @click="num++">增加</button>
  </div>
</template>

<script>
import tmp from '@/views/tmp/tmp.vue'
export default {
  components: { tmp },
  name: 'home',
  data() {
    return {
      num: 10,
      collapsed: false,
    }
  },
  methods: {
    breakpoint(e) {
      console.log(e)
    },
  },
}
</script>

<style lang="less">
.home {
  animation: 0.4s ease 0s 1 normal none running show;
}

@keyframes show {
  0% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
  }
  60% {
    -webkit-transform: translateY(21px);
    transform: translateY(21px);
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
}
</style>
