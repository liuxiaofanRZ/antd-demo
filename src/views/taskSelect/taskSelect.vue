<template>
  <a-popover
    destroyTooltipOnHide
    trigger="click"
    :placement="placement"
    v-model="display"
    @visibleChange="visibleChange"
    :autoAdjustOverflow="false"
  >
    <template slot="content">
      <div class="taskSelect" :style="{ width: width + 'px' }">
        <a-input v-model="search" placeholder="搜索">
          <a-icon slot="prefix" type="search" />
        </a-input>
        <div class="ts-content ts-loading" v-if="loading">
          <a-spin />
        </div>
        <div class="ts-content" v-else>
          <div class="ts-num">已选{{ length }}</div>
          <div class="ts-list">
            <div
              class="ts-item"
              @click="select(item, index)"
              v-for="(item, index) in options"
              :key="index"
              v-show="item.label.indexOf(search) >= 0"
            >
              <div class="ts-label">
                {{ item.label }}
              </div>
              <a-icon class="ts-check" type="check" v-if="item[selectedFlag]" />
            </div>
          </div>
        </div>
        <div class="ts-btns">
          <a-button type="primary" @click="submit">确定</a-button>
        </div>
      </div>
    </template>
    <!-- <button @click="handleClick">111</button> -->
    <!-- <slot></slot> -->
  </a-popover>
</template>

<script>
export default {
  model: {
    prop: 'show',
    event: 'change',
  },
  props: {
    // 参数格式：https://www.antdv.com/components/checkbox-cn/#API
    options: {
      type: Array,
      default: () => [],
    },
    // 含有value的数组
    selectedFlag: {
      type: String,
      default: 'selected',
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    width: {
      default: '200',
      type: String,
      options_c: [],
    },
    loading: {
      default: false,
      type: Boolean,
    },
    show: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      search: '',
      checkedList: [],
      selected: null,
      length: 0,
      display: false,
    }
  },
  watch: {
    options() {
      this.updateOptions()
    },
  },
  methods: {
    handleClick(event) {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation()
    },
    updateOptions() {
      this.length = this.options.filter(
        (item) => item[this.selectedFlag],
      ).length
    },
    select(item) {
      item[this.selectedFlag] = !item[this.selectedFlag]
      item[this.selectedFlag] ? this.length++ : this.length--
    },
    submit() {
      let selects = this.options.filter((item) => item[this.selectedFlag])
      console.log(selects)
      this.display = false
      this.$emit('change', false)
    },
    visibleChange(e) {
      if (!e) {
        this.$emit('change', false)
      }
    },
  },
}
</script>

<style lang="less">
.taskSelect {
  .ts-content {
    // margin-top: 10px;
    height: 230px;
  }
  .ts-loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ts-num {
    padding: 5px;
    color: #000;
    height: 30px;
  }

  .ts-list {
    height: 200px;
    overflow-y: scroll;
  }

  .ts-item {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    height: 30px;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: rgba(245, 246, 250, 0.54);
    }
  }
  .ts-btns {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
