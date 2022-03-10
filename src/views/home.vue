<template>
  <div draggable="true" class="home">
    Hello World!
    <div class="custom-table">
      <table border="1">
        <tr>
          <th class="w120" colspan="2" rowspan="2">科目</th>
          <th class="w400" colspan="2" rowspan="2">摘要</th>
          <th colspan="10">金额</th>
          <th class="w130" rowspan="2">审批</th>
        </tr>
        <tr>
          <th class="w30">千</th>
          <th class="w30">百</th>
          <th class="w30">十</th>
          <th class="w30">万</th>
          <th class="w30">千</th>
          <th class="w30">百</th>
          <th class="w30">十</th>
          <th class="w30">元</th>
          <th class="w30">角</th>
          <th class="w30">分</th>
        </tr>

        <tr>
          <td colspan="2"></td>
          <td colspan="2">项目预付款</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td rowspan="8"></td>
        </tr>
        <tr>
          <td colspan="2"></td>
          <td colspan="2">项目预付款</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2"></td>
          <td colspan="2">项目预付款</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2"></td>
          <td colspan="2">项目预付款</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2"></td>
          <td colspan="2">项目预付款</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="4">合计</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td colspan="3">金额(大写)</td>
          <td colspan="11">壹万元整</td>
        </tr>

        <tr>
          <td style="width: 60px" colspan="1">备注</td>
          <td colspan="4">项目备注</td>
          <td colspan="2">审核</td>
          <td colspan="7">审计人</td>
        </tr>
        <tr class="help">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="less">
.custom-table {
  text-align: center;
  position: relative;
  height: 301px;
  overflow: hidden;
  th,
  td {
    height: 30px;
  }
  .w30 {
    width: 30px;
  }
  .w120 {
    width: 120px;
  }
  .w130 {
    width: 130px;
  }
  .w400 {
    width: 400px;
  }
  .help {
    height: 0;
    opacity: 0;
    overflow: hidden;
  }
}
.home {
  animation: 0.4s ease 0s 1 normal none running show;
}

@keyframes show {
  0% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
  }
  60% {
    -webkit-transform: translateY(21px);
    transform: translateY(21px);
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
  }
}
</style>
