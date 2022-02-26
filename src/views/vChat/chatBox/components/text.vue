<template>
  <div class="text">
    <div class="text-menu">
      <div class="text-menu-left">
        <div
          class="item"
          @focus="faceboxVisible = true"
          @blur="faceboxVisible = false"
          tabindex="-1"
        >
          <div v-show="faceboxVisible" class="facebox">
            <div
              @click="selectFace(face)"
              class="face"
              v-for="(face, index) in faceArray"
              :key="face"
            >
              <img
                :src="publicPath + 'face/' + index + '.gif'"
                :title="face"
                :alt="face"
              />
            </div>
          </div>
          <a-icon type="smile" />
        </div>
        <div class="item">
          <a-upload
            name="file"
            :action="uploadFileUrl"
            :showUploadList="false"
            @change="handleChangeImg"
          >
            <a-icon class="item-icon" type="picture" />
          </a-upload>
        </div>
        <div class="item">
          <a-upload
            name="file"
            :action="uploadFileUrl"
            :showUploadList="false"
            @change="handleChangeFile"
          >
            <a-icon class="item-icon" n type="folder-add" />
          </a-upload>
        </div>
        <div class="item" tabindex="-1" @focus="delayFocus" @blur="delayBlur">
          <div v-show="linkboxVisible" class="linkbox">
            <a-form-model
              ref="linkboxForm"
              :rules="rules"
              v-bind="layout"
              :model="linkForm"
            >
              <a-form-model-item prop="url" label="URL">
                <a-input
                  @focus="delayFocus"
                  @blur="delayBlur"
                  v-model="linkForm.url"
                  placeholder="请输入url"
                  @keyup.enter="sendUrl"
                />
              </a-form-model-item>
              <a-form-model-item prop="remark" label="备注">
                <a-input
                  :maxLength="10"
                  v-model="linkForm.remark"
                  placeholder="备注"
                  @focus="delayFocus"
                  @blur="delayBlur"
                  @keyup.enter="sendUrl"
                />
              </a-form-model-item>

              <div class="btn" @click="sendUrl">发送</div>
            </a-form-model>
          </div>
          <a-icon type="link" />
        </div>
        <div class="item" @click="screenShot">
          <i style="font-size: 20px" class="item-icon iconfont icon-jietu" />
        </div>
        <div class="item" @click="screenShot2">
          <i style="font-size: 20px" class="item-icon iconfont icon-jietu" />
        </div>
      </div>
      <div class="text-menu-right">
        <div class="item">
          <a-icon class="item-icon" type="history" />
          <span class="txt">聊天记录</span>
        </div>
      </div>
    </div>
    <textarea
      placeholder="按 Enter 发送"
      v-model="content"
      @keydown.prevent.enter
      @keyup.enter="onKeyup"
    ></textarea>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('chat')
import faceArray from '../../js/faceArray'
import { BASE_URL } from '@/util/env'
import html2canvas from 'html2canvas'

import kscreenshot from 'kscreenshot'

export default {
  data() {
    return {
      content: '',
      faceboxVisible: false,
      linkboxVisible: false,
      faceArray,
      publicPath: process.env.BASE_URL,
      linkForm: {
        url: '',
        remark: '',
      },
      rules: {
        url: [
          {
            required: true,
            message: '请输入url',
            trigger: 'change',
          },
        ],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
      },
      delaySetTimeout: null,
      kscreenshot: new kscreenshot({
        key: 65,
        endCB: (noob) => {
          console.log(noob)
        },
        cancelCB: (noob) => {
          console.log(noob)
        },
      }),
    }
  },
  computed: {
    uploadFileUrl() {
      console
      return (
        BASE_URL + '/eoa/im/api/uploadFile?token=' + this.$store.state.token
      )
    },
  },
  methods: {
    ...mapActions(['sendMessage']),
    delayBlur() {
      this.delaySetTimeout = setTimeout(() => {
        this.linkboxVisible = false
      }, 0)
    },
    delayFocus() {
      if (this.delaySetTimeout) {
        clearTimeout(this.delaySetTimeout)
      }
      this.linkboxVisible = true
    },
    onKeyup(e) {
      if (e.ctrlKey) {
        this.content += '\n'
      } else if (this.content.length) {
        this.sendMessage(this.content)
        this.content = ''
      }
    },
    selectFace(face) {
      this.content += `face${face}`
    },
    handleChangeImg(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        let content = `img[${info.file.response.data.src}]`
        this.sendMessage(content)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 发送失败`)
      }
    },
    handleChangeFile(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        let content = `file(${info.file.response.data.src})[${info.file.response.data.name}]`
        this.sendMessage(content)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 发送失败`)
      }
    },
    sendUrl() {
      this.$refs.linkboxForm.validate((valid) => {
        if (valid) {
          this.sendMessage(
            `a(${this.linkForm.url})[${this.linkForm.remark || ''}]`,
          )
          this.$refs.linkboxForm.resetFields()
          this.linkboxVisible = false
        }
      })
    },
    screenShot() {
      this.kscreenshot.startScreenShot()
    },
    screenShot2() {
      const $this = this
      html2canvas(document.querySelector('body'), {
        useCORS: true,
        foreignObjectRenderign: true,
        allowTaint: false,
      }).then(function (canvas) {
        let imageurl = canvas.toDataURL('image/png')
        let imagename = '文件名称'
        $this.fileDownload(imageurl, imagename)
      })
    },
    //下载截屏图片
    fileDownload(downloadUrl, downloadName) {
      let aLink = document.createElement('a')
      aLink.style.display = 'none'
      aLink.href = downloadUrl
      aLink.download = `${downloadName}.jpg`
      // 触发点击-然后移除
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
    },
  },
}
</script>

<style lang="less" scoped>
.text {
  height: 200px;
  border-top: solid 1px #ddd;
  white-space: pre-line;
  textarea {
    padding: 10px;
    height: calc(100% - 40px);
    width: 100%;
    border: none;
    outline: none;
    font-family: 'Micrsofot Yahei';
    resize: none;
  }
  &-menu {
    height: 40px;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    font-size: 22px;
    color: #555;
    padding: 0 5px;
    background-color: #fff;
    position: relative;
    &-left,
    &-right {
      flex: none;
      display: flex;
      .item {
        margin: 0 10px;
        flex: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        &-icon {
          font-size: 22px;
        }
        .txt {
          margin-left: 5px;
          font-size: 16px;
          color: #000;
        }
      }
    }
  }
  .facebox {
    display: flex;
    width: 374px;
    // height: 208px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    box-shadow: ~'0 0 20px rgb(0 0 0 / 20%)';
    flex-wrap: wrap;
    position: absolute;
    bottom: 40px;
    left: 0;
    .face {
      cursor: pointer;
      float: left;
      border: 1px solid #e8e8e8;
      height: 30px;
      width: 30px;
      overflow: hidden;
      margin: -1px 0 0 -1px;
      padding: 4px 2px;
      > img {
        margin: auto;
        display: block;
      }
      &:hover {
        position: relative;
        z-index: 2;
        border: 1px solid #eb7350;
        background: #fff9ec;
      }
    }
  }

  .linkbox {
    // display: flex;
    width: 374px;
    padding: 20px 10px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    box-shadow: ~'0 0 20px rgb(0 0 0 / 20%)';
    position: absolute;
    bottom: 40px;
    left: 0;
    .btn {
      float: right;
      background-color: #5fb878;
      color: #fff;
      padding: 0 20px;
      line-height: 32px;
      border-radius: 3px;
      margin-right: 10px;
      &:hover {
        background-color: #69bc80;
      }
      &:active {
        background-color: #59b573;
      }
    }
  }
}
</style>
