<template>
  <div class="draggableIndex">
    <!--使用draggable组件-->
    <div class="itxst">
      <div class="col">
        <div class="title">国内网站</div>
        <draggable
          v-model="arr1"
          group="site"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group>
            <div class="item" v-for="item in arr1" :key="item.id">
              {{ item.name }}
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="col">
        <div class="title">你可以把左边的元素拖到右边</div>
        <draggable
          v-model="arr2"
          group="site"
          animation="300"
          dragClass="dragClass"
          ghostClass="ghostClass"
          chosenClass="chosenClass"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group>
            <div class="item" v-for="item in arr2" :key="item.id">
              {{ item.name }}
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
//导入draggable组件
import draggable from 'vuedraggable'
export default {
  name: 'draggableIndex',
  //注册draggable组件
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      //定义要被拖拽对象的数组
      arr1: [
        { id: 1, name: 'www.itxst.com' },
        { id: 2, name: 'www.jd.com' },
        { id: 3, name: 'www.baidu.com' },
        { id: 4, name: 'www.taobao.com' },
      ],
      arr2: [
        { id: 11, name: 'www.google.com' },
        { id: 12, name: 'www.msn.com' },
        { id: 13, name: 'www.ebay.com' },
        { id: 14, name: 'www.yahoo.com' },
      ],
    }
  },
  methods: {
    //开始拖拽事件
    onStart() {
      this.drag = true
    },
    //拖拽结束事件
    onEnd() {
      this.drag = false
    },
  },
}
</script>
