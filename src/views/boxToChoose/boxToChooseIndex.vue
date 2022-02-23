<template>
  <div class="boxToChooseIndex">
    <div class="box" ref="box" @mousedown="handleMousedown">
      <div
        ref="mask"
        v-show="showMask"
        :style="{
          width: maskWidth,
          height: maskHeight,
          left: maskLeft,
          top: maskTop,
        }"
        class="mask"
      ></div>
      <div class="item" v-for="item in list" :key="item.id">
        <div class="tmp" :class="'group' + item.group">
          <div>{{ item.selected }}</div>
          <div>{{ item.group || '-' }}</div>
        </div>
      </div>
    </div>

    <a-row>
      <a-col :span="2">组：</a-col>
      <a-col :span="22">
        <a-radio-group v-model="curGroup">
          <a-radio :value="1" class="color1"> group1 </a-radio>
          <a-radio :value="2" class="color2"> group2 </a-radio>
          <a-radio :value="3" class="color3"> group3 </a-radio>
        </a-radio-group></a-col
      >
      <a-col :span="2">隔座：</a-col>
      <a-col :span="22">
        <a-radio-group v-model="isGap">
          <a-radio :value="true" class="group1"> 是 </a-radio>
          <a-radio :value="false" class="group2"> 否 </a-radio>
        </a-radio-group>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import boxToChoose from './boxToChoose.vue'
let id = 0
export default {
  name: 'boxToChooseIndex',
  //   components: { boxToChoose },
  data() {
    return {
      box: null,
      boxLeft: 0,
      boxTop: 0,
      mask: null,
      list: [
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
        { selected: false, id: id++, group: '' },
      ],
      mask_start: {
        x: 0,
        y: 0,
      },
      mask_end: {
        x: 0,
        y: 0,
      },
      showMask: false,
      curGroup: 1,
      isGap: false,
    }
  },
  mounted() {
    this.box = this.$refs.box
    this.mask = this.$refs.mask
    this.boxLeft = this.box.getBoundingClientRect().left
    this.boxTop = this.box.getBoundingClientRect().top
    console.log(this.box)
  },
  computed: {
    maskLeft() {
      return Math.min(this.mask_start.x, this.mask_end.x) - this.boxLeft + 'px'
    },
    maskTop() {
      return Math.min(this.mask_start.y, this.mask_end.y) - this.boxTop + 'px'
    },
    maskWidth() {
      return Math.abs(this.mask_end.x - this.mask_start.x) + 'px'
    },
    maskHeight() {
      return Math.abs(this.mask_end.y - this.mask_start.y) + 'px'
    },
  },
  methods: {
    handleMousedown(e) {
      this.showMask = true
      this.mask_start.x = e.clientX
      this.mask_start.y = e.clientY
      this.mask_end.x = e.clientX
      this.mask_end.y = e.clientY
      this.box.addEventListener('mousemove', this.handleMousemove)
      this.box.addEventListener('mouseup', this.handleMouseup)
    },
    handleMousemove(e) {
      this.mask_end.x = e.clientX
      this.mask_end.y = e.clientY
    },
    handleMouseup() {
      this.box.removeEventListener('mousemove', this.handleMousemove)
      this.box.removeEventListener('mouseup', this.handleMouseup)
      this.handleDomSelect()
      this.resetPos()
      this.showMask = false
    },
    handleDomSelect() {
      let rect_mask = this.mask.getClientRects()[0]
      let i = 0
      this.box.querySelectorAll('.item').forEach((node, index) => {
        let rect = node.getClientRects()[0]
        if (this.collide(rect, rect_mask)) {
          let item = this.list[index]
          if (this.isGap) {
            if (i++ % 2 === 1) {
              item.selected = true
              item.group = this.curGroup
            } else {
              item.selected = false
              item.group = ''
            }
          } else {
            item.selected = true
            item.group = this.curGroup
          }
        }
      })
      // console.log(rect_mask)
    },
    resetPos() {
      this.mask_start = {
        x: 0,
        y: 0,
      }
      this.mask_end = {
        x: 0,
        y: 0,
      }
    },

    collide(rect1, rect2) {
      const maxX = Math.max(rect1.x + rect1.width, rect2.x + rect2.width)
      const maxY = Math.max(rect1.y + rect1.height, rect2.y + rect2.height)
      const minX = Math.min(rect1.x, rect2.x)
      const minY = Math.min(rect1.y, rect2.y)
      if (
        maxX - minX <= rect1.width + rect2.width &&
        maxY - minY <= rect1.height + rect2.height
      ) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style lang="less">
@color_group1: #4ae;
@color_group2: #e4a;
@color_group3: #ae4;
.boxToChooseIndex {
  .box {
    padding: 100px 20px;
    outline: 1px solid #eee;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    cursor: default;
    user-select: none;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #f5f5f5;
    background-color: #000;
    opacity: 0.1;
    width: 0;
    height: 0;
  }
  .item {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .tmp {
      width: 80%;
      height: 80%;
      background-color: #f5f5f5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .group1 {
      background-color: @color_group1;
    }
    .group2 {
      background-color: @color_group2;
    }
    .group3 {
      background-color: @color_group3;
    }
  }
  .color1 {
    color: @color_group1;
  }
  .color2 {
    color: @color_group2;
  }
  .color3 {
    color: @color_group3;
  }
}
</style>
