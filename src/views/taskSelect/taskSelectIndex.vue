<template>
  <div class="about">
    <h1>This is an taskSelectIndex page</h1>
    <task-select
      v-model="show"
      :options="options"
      :loading="loading"
      selectedFlag="selected"
    >
      <a-button @click="getData">显示</a-button>
    </task-select>
  </div>
</template>

<script>
import taskSelect from './taskSelect.vue'
export default {
  components: { taskSelect },
  data() {
    return {
      options: [],
      loading: false,
      show: false,
    }
  },
  methods: {
    getData() {
      console.log(this.show)
      if (this.show) return
      this.show = true
      this.loading = true
      setTimeout(() => {
        this.options = [
          { label: '刘小凡1', value: '1111', selected: false },
          { label: '小凡2', value: '1112', selected: true },
          { label: '刘小凡3', value: '1113', selected: false },
          { label: '刘凡4', value: '1114', selected: false },
          { label: '刘凡5', value: '1115', selected: true },
          { label: '刘6', value: '1116', selected: false },
          { label: '刘凡7', value: '1117', selected: false },
          { label: '刘凡8', value: '1118', selected: false },
          { label: '小凡9', value: '1119', selected: false },
          { label: '小凡10', value: '11110', selected: false },
          { label: '小凡11', value: '11111', selected: false },
        ]
        this.loading = false
      }, 0)
    },
  },
}
</script>
