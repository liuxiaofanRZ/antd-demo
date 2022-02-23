<template>
  <div class="learnRenderIndex">
    <learn-render v-model="value" :level="2">
      <span>Hello world!</span>
    </learn-render>
  </div>
</template>

<script>
import learnRender from './learnRender.vue'
export default {
  name: 'learnRenderIndex',
  components: { learnRender },
  data() {
    return { value: '111' }
  },
}
</script>

<style></style>
