<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd"> Add </a-button>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template slot="name" slot-scope="text, record">
        <table-custom
          :text="text"
          @change="onCellChange(record.key, 'name', $event)"
        />
      </template>
      <template slot="customTitle">
        <div class="custom-title">
          <div class="left">节次</div>
          <div class="right">星期</div>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
import tableCustom from './tableCustom.vue'
export default {
  components: {
    tableCustom,
  },
  data() {
    return {
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
        },
      ],
      count: 2,
      columns: [
        {
          dataIndex: 'name',
          width: '30%',
          scopedSlots: { customRender: 'name' },
          slots: { title: 'customTitle' },
          customHeaderCell(column) {
            column.className = 'custom-title-box'
            return column
          },
        },
        {
          title: 'age',
          dataIndex: 'age',
        },
        {
          title: 'address',
          dataIndex: 'address',
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find((item) => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter((item) => item.key !== key)
    },
    handleAdd() {
      const { count, dataSource } = this
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`,
      }
      this.dataSource = [...dataSource, newData]
      this.count = count + 1
    },
  },
}
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
<style lang="less">
.ant-table-thead > tr > th.custom-title-box {
  position: relative;

  // display: flex;
  .custom-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to top right,
      transparent 0%,
      transparent calc(50% - 1px),
      #ededef 50%,
      transparent calc(50% + 1px),
      transparent 100%
    );
    .left {
      position: absolute;
      bottom: 10px;
      left: 18%;
    }
    .right {
      position: absolute;
      right: 18%;
      top: 10px;
    }
  }
}
</style>
