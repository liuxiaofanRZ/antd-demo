<template>
  <div class="OaFawenDetail">
    <a-row class="group">
      <a-col class="title" :span="24"><div>基本信息</div></a-col>
      <a-col :span="12">
        <div class="label"><!-- 文件标题 -->标题:</div>
        <div class="value">{{ record.title }}</div>
      </a-col>
      <a-col :span="6">
        <div class="label">密级:</div>
        <div class="value">{{ record.mj }}</div>
      </a-col>
      <a-col :span="6">
        <div class="label">紧急程度:</div>
        <div class="value">{{ record.jjcd }}</div>
      </a-col>

      <!-- row -->
      <a-col :span="12">
        <div class="label">主送:</div>
        <div class="value">{{ record.zs }}</div>
      </a-col>

      <a-col :span="12">
        <div class="label">抄送:</div>
        <div class="value">{{ record.cs }}</div>
      </a-col>
      <!-- row -->
      <a-col :span="24">
        <div class="label">公文内容:</div>
        <div class="value">{{ record.gwnr }}</div>
      </a-col>

      <!-- row -->
      <a-col :span="24">
        <div class="label">主题词:</div>
        <div class="value">{{ record.ztc }}</div>
      </a-col>
      <!-- row -->
      <a-col :span="8">
        <div class="label">拟稿人:</div>
        <div class="value">{{ record.ngr }}</div>
      </a-col>
      <a-col :span="8">
        <div class="label">拟办科室:</div>
        <div class="value">{{ record.nbks }}</div>
      </a-col>
      <a-col :span="8">
        <div class="label">公开方式:</div>
        <div class="value">{{ record.gkfs }}</div>
      </a-col>

      <!-- row -->

      <a-col :span="8">
        <div class="label">发文单位:</div>
        <div class="value">{{ record.fwdw }}</div>
      </a-col>
      <a-col :span="8">
        <div class="label">发文时间:</div>
        <div class="value">{{ record.fwsj }}</div>
      </a-col>
      <a-col :span="8">
        <div class="label">截止日期:</div>
        <div class="value">{{ record.jzrq }}</div>
      </a-col>
      <!-- row -->
      <a-col class="title" :span="24"><div>附件</div></a-col>
      <a-col :span="24" class="fj-item">
        <a v-for="item in fj" :key="item" :href="item">{{ item }}</a>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      record: {
        gkfs: null,
        bpmStatus: '2',
        bpmStatus_dictText: '处理中',
        gwnr: '阿斯发送到发送到发送发送到发送到发达阿斯发送到发送到发送发送到发送到发达阿斯发送到发送到发送发送到发送到发达阿斯发送到发送到发送发送到发送到发达阿斯发送到发送到发送发送到发送到发达阿斯发送到发送到发送发送到发送到发达阿斯发送到发送到发送发送到发送到发达阿斯发送到发送到发送发送到发送到发达阿斯发送到发送到发送发送到发送到发达阿斯发送到发送到发送发送到发送到发达阿斯发送到发送到发送发送到发送到发达阿斯发送到发送到发送发送到发送到发达',
        fj: 'http://10.30.254.25:9000/ico/temp/一寸照_1639733022143.jpg,http://10.30.254.25:9000/ico/temp/QQ图片20211217163813_1639733066112.jpg',
        gkfs_dictText: null,
        title: '测试',
        jjcd: null,
        wh: null,
        jjcd_dictText: null,
        fwdw: '至信科技',
        fwdwId: '946b09d7efa04182b353d33c10a6c343',
        updateBy: null,
        wjStatus: '0',
        ngr: '刘小凡',
        fwsj: null,
        id: '1471728308992004098',
        mj: null,
        ztc: null,
        mj_dictText: null,
        updateTime: null,
        version: 0,
        nbks: null,
        cs: null,
        createBy: 'hsl',
        deleted: 0,
        createTime: '2021-12-17',
        zs: null,
        sysOrgCode: 'A03A06A35A02',
        jzrq: '2021-12-17',
      },
    }
  },
  computed: {
    fj() {
      return this.record.fj ? this.record.fj.split(',') : []
    },
  },
}
</script>

<style lang="less">
@borderColor: #dedede;
@backgroundColorDeep: #fafafa;
@titleColor: #000;
.OaFawenDetail {
  margin: 0 auto;
  color: #2e2e2e;
  min-width: 800px;
  max-width: 1400px;
  .ant-row {
    border-right: 1px solid @borderColor;
    border-bottom: 1px solid @borderColor;
    // border-radius: 10px;
    overflow: hidden;
  }
  .ant-col {
    border-top: 1px solid @borderColor;
    border-left: 1px solid @borderColor;
    // height: 40px;
    display: flex;
    > div {
      padding: 10px 20px;
      display: flex;
      min-height: 41px;
      // align-items: center;
    }
  }
  .title {
    font-size: 1.125em;
    background-color: @backgroundColorDeep;
    color: @titleColor;
  }
  .label {
    justify-content: flex-end;
    border-right: 1px solid @borderColor;
    padding: 10px 14px !important;
    min-width: 100px;
    max-width: 150px;
    flex: none;
    background-color: @backgroundColorDeep;
  }
  .value {
    flex: 1;
    color: #5c5c5c;
  }
  .fj-item {
    padding: 10px 20px;
    flex-direction: column;
    align-items: start;
    > a {
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
