<template>
  <div class="vchat-message">
    <vchat-headline></vchat-headline>
    <vchat-message></vchat-message>
    <vchat-text></vchat-text>
  </div>
</template>

<script>
import vchatText from './text'
import vchatMessage from './message'
import vchatHeadline from './headline'
export default {
  name: 'chatMessage',
  components: {
    vchatText,
    vchatMessage,
    vchatHeadline,
  },
  data() {
    return {}
  },
}
</script>

<style lang="less">
.vchat-message {
  height: 100%;
}
</style>
