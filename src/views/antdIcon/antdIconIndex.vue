<template>
  <div class="antdIconIndex">
    <span>自定义 font 图标： </span>
    <my-icon type="icon-arrowright"></my-icon>
    <a-divider type="vertical" />
    <my-icon type="icon-kexuanzuowei"></my-icon>


    <a-divider />


    <span>自定义 SVG 图标： </span>
    <a-icon style="color:red" :component="arrowRight"></a-icon>
    <a-divider type="vertical" />
    <a-icon :component="seat" />
    <a-divider type="vertical" />

    <a-icon style="color:red" :component="seat" />

    <div class="btns">
      <div class="btn-box">
        <a-button block>按钮demo</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import seat from './seat2.svg'
import arrowRight from './arrow_right.svg'

import { Icon } from 'ant-design-vue'
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2982662_u4pm8aemrsb.js', // 在 iconfont.cn 上生成
})
export default {
  name: 'antdIconIndex',
  components: { MyIcon },
  data() {
    console.log(seat)
    return { seat, arrowRight }
  },
}
</script>

<style lang="less">
.antdIconIndex {
  font-size: 40px;
  .btns {
    display: flex;
    .btn-box {
      flex: 1;
    }
  }
}
</style>
