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
