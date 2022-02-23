<template>
  <span @click="showModal">
    <slot></slot>
    <a-modal
      class="addObject"
      :visible="visible"
      :closable="false"
      :footer="null"
      :width="1000"
      @cancel="cancel"
    >
      <div class="object-step">
        <a-steps :current="step" size="small" labelPlacement="vertical">
          <a-step title="设定目标" />
          <a-step title="添加关键结果" />
          <a-step title="预览目标" />
        </a-steps>
      </div>

      <div class="object-set" v-if="step === 0">
        <a-textarea
          v-model="form_set.name"
          placeholder="使用OKR系统的「对齐」功能，更明确的做好 目标对齐工作 ↵"
          :rows="5"
          :maxLength="150"
        />

        <a-form-model layout="inline" :model="form_set" class="object-set-form">
          <a-form-model-item label="目标类型">
            <a-select
              style="width: 120px"
              class="object-set-type"
              v-model="form_set.type"
            >
              <a-select-option :value="0"> 个人 </a-select-option>
              <a-select-option :value="1"> 部门 </a-select-option>
              <a-select-option :value="2"> 公司 </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="object-results" v-else-if="step === 1">
        <div class="object-results-title">
          <span class="object-results-title-text">{{ form_set.name }}</span>
        </div>
        <div class="object-results-form">
          <div
            class="form-item"
            v-for="(item, index) in form_result.results"
            :key="index"
          >
            <div class="form-item-label">KR{{ index }}</div>
            <div
              @click="showResultEdit(item, index)"
              v-if="!item.__edit"
              class="form-item-values"
            >
              {{ item.name }}
            </div>
            <div v-else class="form-item-values edit">
              <a-textarea
                v-model="item.name_e"
                placeholder="决定产出的往往只有几个最重要的事情 ↵"
                class="form-item-name"
                autoSize
                :maxLength="150"
              />
              <div class="form-item-bundle">
                <span>量化条件</span>
                <a-select
                  class="input"
                  style="width: 100px"
                  v-model="item.conditions_e"
                >
                  <a-select-option :value="0"> 进度 </a-select-option>
                  <a-select-option :value="1"> 完成情况 </a-select-option>
                </a-select>
                <div v-if="item.conditions_e === 0">
                  <span>单位</span>
                  <a-select class="input" v-model="item.unit_e">
                    <a-select-option :value="0"> 进度 </a-select-option>
                    <a-select-option :value="1"> 完成情况 </a-select-option>
                  </a-select>

                  <span>起始值</span>
                  <a-input-number
                    class="input"
                    id="inputNumber"
                    style="width: 62px"
                    v-model="item.startValue_e"
                    :min="0"
                    :max="100"
                  />

                  <span>完成值</span>
                  <a-input-number
                    class="input"
                    id="inputNumber"
                    style="width: 62px"
                    v-model="item.completionValue_e"
                    :min="0"
                    :max="100"
                  />
                </div>
                <div v-else>
                  <span><a-icon type="close-circle" />未完成</span>
                  <span><a-icon type="check-circle" />已完成</span>
                </div>

                <div class="form-item-btns">
                  <a-button @click="item.__edit = false">取消</a-button>
                  <a-button type="primary" @click="editResult(item)"
                    >保存</a-button
                  >
                </div>
              </div>
            </div>
            <div class="form-item-right">
              {{ percent(index) }}%
              <a-icon
                @click="deleteResult(item, index)"
                class="form-item-delete"
                type="close-circle"
              />
            </div>
          </div>

          <div class="form-item" key="last">
            <div class="form-item-label">
              KR{{ form_result.results.length + 1 }}
            </div>
            <div
              @click="showResultAdd"
              v-if="!form_result_add.__edit"
              class="form-item-values add"
            >
              <a-icon type="plus" style="font-size: 12px" />添加关键结果
            </div>
            <div v-else class="form-item-values edit">
              <a-textarea
                v-model="form_result_add.name_e"
                placeholder="决定产出的往往只有几个最重要的事情 ↵"
                class="form-item-name"
                autoSize
                :maxLength="150"
              />
              <div class="form-item-bundle">
                <span>量化条件</span>
                <a-select
                  class="input"
                  style="width: 100px"
                  v-model="form_result_add.conditions_e"
                >
                  <a-select-option :value="0"> 进度 </a-select-option>
                  <a-select-option :value="1"> 完成情况 </a-select-option>
                </a-select>
                <div v-if="form_result_add.conditions_e === 0">
                  <span>单位</span>
                  <a-select class="input" v-model="form_result_add.unit_e">
                    <a-select-option :value="0"> 进度 </a-select-option>
                    <a-select-option :value="1"> 完成情况 </a-select-option>
                  </a-select>

                  <span>起始值</span>
                  <a-input-number
                    class="input"
                    id="inputNumber"
                    style="width: 62px"
                    v-model="form_result_add.startValue_e"
                    :min="0"
                    :max="100"
                  />

                  <span>完成值</span>
                  <a-input-number
                    class="input"
                    id="inputNumber"
                    style="width: 62px"
                    v-model="form_result_add.completionValue_e"
                    :min="0"
                    :max="100"
                  />
                </div>
                <div v-else>
                  <span><a-icon type="close-circle" />未完成</span>
                  <span><a-icon type="check-circle" />已完成</span>
                </div>

                <div class="form-item-btns">
                  <a-button @click="form_result_add.__edit = false"
                    >取消</a-button
                  >
                  <a-button type="primary" @click="addResult">保存</a-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="object-preview" v-else>
        <div class="object-results-title">
          <span class="object-results-title-text">{{ form_set.name }}</span>
          <a-dropdown slot="extra" title="信心值" :trigger="['click']">
            <a class="ant-dropdown-link">
              <a-icon type="heart" theme="twoTone" two-tone-color="#eb2f96" />
              {{ form_preview.confidence }}分
            </a>
            <a-menu slot="overlay">
              <a-menu-item
                v-for="(t, n) in 10"
                :class="
                  n + 1 == form_preview.confidence
                    ? 'ant-dropdown-menu-item-active'
                    : ''
                "
                @click="selectOverlay(n + 1)"
                :key="n"
              >
                <span
                  ><a-icon
                    type="heart"
                    theme="twoTone"
                    two-tone-color="#eb2f96"
                  />
                  {{ n + 1 }}分</span
                >
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="object-results-form">
          <div
            class="form-item"
            v-for="(item, index) in form_result.results"
            :key="index"
          >
            <div class="form-item-label">KR{{ index }}</div>
            <div class="form-item-values">
              {{ item.name }}
            </div>
            <div class="form-item-right">{{ percent(index) }}%</div>
          </div>
        </div>
      </div>

      <div class="object-btns">
        <a-button @click="cancel">取消</a-button>
        <a-button v-show="step !== 0" @click="back">上一步</a-button>
        <a-button v-if="step === 2" type="primary" @click="next">完成</a-button>
        <a-button v-else type="primary" @click="next">下一步</a-button>
      </div>
    </a-modal>
  </span>
</template>

<script>
export default {
  data() {
    return {
      step: 0,
      visible: false,
      form_set: {
        name: '',
        type: 1,
      },
      form_result: {
        results: [],
      },
      form_result_add: {
        __edit: false,
        name_e: '',
        conditions_e: 0,
        unit_e: 0,
        startValue_e: 0,
        completionValue_e: 100,
      },
      form_preview: {
        confidence: 5,
      },
    }
  },

  methods: {
    percent(index) {
      let length = this.form_result.results.length
      let percent = Math.floor(100 / length)
      if (index == length - 1) {
        return 100 - percent * (length - 1)
      }
      return percent
    },
    cancel() {
      if (this.form_set.name) {
        this.$confirm({
          title: '是否关闭',
          content: '有已填写的内容，是否关闭弹窗？',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            this.visible = false
          },
        })
      } else {
        this.visible = false
      }
    },
    showModal() {
      this.visible = true
    },
    next() {
      if (this.step === 0 && !this.form_set.name) {
        this.$message.warn('您填写的目标名称不能为空')
      } else if (this.step === 1) {
        if (this.form_result.results.length <= 0) {
          this.$message.warn('请添加至少一个关键结果')
        } else {
          this.closeOtherEditStatus(-1)
          this.step++
        }
      } else if (this.step == 2) {
        // this.request()
        this.visible = false
        this.step = 0
      } else {
        this.step++
      }
    },
    back() {
      this.step--
    },
    submit() {},

    showResultEdit(values, index) {
      values.name_e = values.name
      values.conditions_e = values.conditions
      values.unit_e = values.unit
      values.startValue_e = values.startValue
      values.completionValue_e = values.completionValue
      this.closeOtherEditStatus(index)
    },
    showResultAdd() {
      this.form_result_add.__edit = true
      this.closeOtherEditStatus(this.form_result.results.length)
    },
    closeOtherEditStatus(index) {
      let length = this.form_result.results.length
      if (index == length) {
        this.form_result.results.forEach((v) => {
          v.__edit = false
        })
      } else if (index < length || index >= 0) {
        this.form_result.results.forEach((v, i) => {
          v.__edit = i === index
        })
        this.form_result_add.__edit = false
      } else {
        this.form_result.results.forEach((v) => {
          v.__edit = false
        })
        this.form_result_add.__edit = false
      }
    },

    editResult(values) {
      let obj = {}
      obj.name = values.name = values.name_e
      obj.conditions = values.conditions = values.conditions_e
      obj.unit = values.unit = values.unit_e
      obj.startValue = values.startValue = values.startValue_e
      obj.completionValue = values.completionValue = values.completionValue_e

      // this.request(obj)
      values.__edit = false
    },

    addResult() {
      let form = this.form_result_add
      if (!form.name_e) {
        this.$message.warn('关键结果不能为空！')
        return
      }
      form.__edit = false
      this.form_result.results.push({
        ...form,
        name: form.name_e,
        conditions: form.conditions_e,
        unit: form.unit_e,
        startValue: form.startValue_e,
        completionValue: form.completionValue_e,
      })
      this.reset_form_result_add()
    },
    reset_form_result_add() {
      this.form_result_add = {
        __edit: false,
        name_e: '',
        conditions_e: 0,
        unit_e: 0,
        startValue_e: 0,
        completionValue_e: 100,
      }
    },
    reset_form_preview() {
      this.form_preview = {
        confidence: 5,
      }
    },
    reset_form_result() {
      this.form_result = {
        results: [],
      }
    },
    reset_form_set() {
      this.form_set = {
        name: '111',
        type: 1,
      }
    },
    deleteResult(index) {
      this.$confirm({
        title: '提示',
        content: '是否删除关键结果？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.form_result.results.splice(index, 1)
        },
      })
    },

    selectOverlay(n) {
      this.form_preview.confidence = n
    },
  },
}
</script>

<style lang="less">
.addObject {
  .object-step {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .ant-steps {
      width: 60%;
    }
  }
  .object-set {
    .ant-input {
      resize: none;
    }

    &-form {
      margin-top: 10px;
    }
  }
  .object-results,
  .object-preview {
    &-title {
      color: #14142b;
      font-size: 16px;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      padding-right: 30px;
      &-text {
        margin-right: 40px;
        overflow: hidden;
      }
    }
    &-form {
      margin-left: 40px;
    }
    .form-item {
      display: flex;
      line-height: 32px;

      min-height: 34px;
      padding: 4px 8px 4px 8px;
      margin-top: 4px;
      align-items: flex-start;
      &:hover {
        background: #f5f6fa;
        border-radius: 8px;
        .form-item-delete {
          display: block;
        }
      }
      &-label {
        color: #a0a3bd;
        font-weight: 700;
        width: 46px;
      }
      &-right {
        position: relative;
        padding-right: 24px;
      }
      &-delete {
        position: absolute;
        right: 0;
        top: 8px;
        color: #a0a3bd;
        display: none;
        cursor: pointer;
        font-size: 16px;
        &:hover {
          color: #005eff;
        }
      }
      &-values {
        flex: 1;
        padding-right: 20px;
        &.add {
          color: #ff9900;
          cursor: pointer;
          flex: none;
          &:hover {
            color: #ffd290;
          }
        }
        .input {
          margin-left: 8px;
          margin-right: 16px;
        }
      }
      &-name {
        // width:100%;
        resize: none;
      }
      &-bundle {
        margin-top: 10px;
        display: flex;
        align-items: center;
      }
      &-btns {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .ant-btn:last-child {
          margin-left: 10px;
        }
      }
    }
  }
  .object-btns {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    .ant-btn {
      margin-left: 10px;
    }
  }

  .ant-dropdown-menu-item-active {
    background-color: rgba(0, 160, 233, 0.41);
  }
}
</style>
