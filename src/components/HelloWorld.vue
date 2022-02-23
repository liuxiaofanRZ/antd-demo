<template>
  <div>
    <a-button type="primary" @click="showDrawer"> Open </a-button>
    <a-drawer
      title="Multi-level drawer"
      width="520"
      :closable="false"
      :visible="visible"
      @close="onClose"
    >
      <a-button type="primary" @click="showChildrenDrawer">
        Two-level drawer
      </a-button>

      <div>
        <a-button style="marginright: 8px" @click="onClose"> Cancel </a-button>
      </div>
    </a-drawer>
    <a-drawer
      title="Two-level Drawer"
      width="320"
      :closable="false"
      :visible="childrenDrawer"
      @close="onChildrenDrawerClose"
    >
      <a-button type="primary" @click="showChildrenDrawer">
        This is two-level drawer
      </a-button>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      childrenDrawer: false,
    }
  },
  methods: {
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    showChildrenDrawer() {
      this.childrenDrawer = true
    },
    onChildrenDrawerClose() {
      this.childrenDrawer = false
    },
  },
}
</script>
