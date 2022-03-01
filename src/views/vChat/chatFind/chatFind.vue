<template>
  <div class="vchat-find" v-if="isChatFindOpen">
    <vchat-header id="vchatfinddragbar" title="查找" @close="majorClose" />
    <div class="vchat-find-main">
      <a-form-model
        class="vchat-find-form"
        layout="inline"
        :model="searchForm"
        @submit="search"
        @submit.native.prevent
      >
        <a-form-model-item prop="username">
          <a-input
            style="width: 500px"
            v-model="searchForm.username"
            placeholder="请输入用户账号/昵称/群名称"
          >
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" html-type="submit"> 查找 </a-button>
        </a-form-model-item>
        <a-form-model-item prop="type">
          <a-radio-group v-model="searchForm.type">
            <a-radio value="friend"> 找人 </a-radio>
            <a-radio value="group"> 找群 </a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item>
          <a-button type="link" @click="openCreate"> 我要建群 </a-button>
        </a-form-model-item>
      </a-form-model>

      <div class="vchat-find-list" v-if="searchResultList.length > 0">
        <div
          class="vchat-find-item"
          v-for="item in searchResultList"
          :key="item.id"
        >
          <!-- 群 -->
          <template v-if="item.type">
            <a-avatar
              shape="square"
              class="vchat-find-avatar"
              :src="item.avatar"
              icon="user"
            />
            <div class="vchat-find-info">
              <div class="vchat-find-username ellipsis">
                {{ item.groupName }}
              </div>
              <div class="vchat-find-sign ellipsis">
                {{ item.groupIntroduce || '(无简介)' }}
              </div>
              <a-button
                class="vchat-find-add"
                type="primary"
                icon="plus"
                size="small"
                @click="openAdd(item)"
              >
                加群
              </a-button>
            </div>
          </template>
          <!-- 人 -->
          <template v-else>
            <a-avatar
              shape="square"
              class="vchat-find-avatar"
              :src="item.avatar"
              icon="user"
            />
            <div class="vchat-find-info">
              <div class="vchat-find-username ellipsis">
                {{ item.username }}
              </div>
              <div class="vchat-find-sign ellipsis">
                {{ item.sign || '我很懒，懒得写签名' }}
              </div>
              <a-button
                class="vchat-find-add"
                type="primary"
                icon="plus"
                size="small"
                @click="openAdd(item)"
              >
                加好友
              </a-button>
            </div>
          </template>
        </div>
      </div>
      <a-empty v-else />
    </div>

    <!-- 添加人/群 -->
    <div
      class="vchat-find-ask"
      v-vcdrag="'vchatfindaskdragbar'"
      v-if="askFormVisible"
    >
      <vchat-header
        id="vchatfindaskdragbar"
        :title="
          currentAddItem.type
            ? '加入群组：' + currentAddItem.groupName
            : '添加好友：' + currentAddItem.username
        "
        @close="subCloseAsk"
      />
      <div class="vchat-find-ask-item" v-if="currentAddItem">
        <a-avatar
          :size="100"
          shape="square"
          class="vchat-find-ask-avatar"
          :src="currentAddItem.avatar"
          icon="user"
        />

        <a-form-model
          class="vchat-find-ask-form"
          :model="askForm"
          @submit="sendFriendApply"
          @submit.native.prevent
          ref="askForm"
        >
          <a-form-model-item v-if="!currentAddItem.type">
            <a-select v-model="askForm.groupId" placeholder="选择分组">
              <a-select-option
                :value="fgroup.id"
                v-for="fgroup in friends"
                :key="fgroup.id"
                >{{ fgroup.groupname }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
          <a-form-model-item>
            <a-input
              v-model="askForm.remark"
              placeholder="验证信息"
              type="textarea"
              :autoSize="{ minRows: 3, maxRows: 8 }"
            >
            </a-input>
          </a-form-model-item>
          <a-form-model-item align="end">
            <a-button type="primary" html-type="submit"> 发送请求 </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
    <!-- 创建群 -->
    <div
      class="vchat-find-create"
      v-vcdrag="'vchatfindcreatedragbar'"
      v-if="createFormVisible"
    >
      <vchat-header
        id="vchatfindcreatedragbar"
        title="创建群"
        @close="subCloseCreate"
      />
      <div class="vchat-find-create-form">
        <a-form-model
          :model="createForm"
          @submit="createGroup"
          @submit.native.prevent
          ref="askForm"
          layout="horizontal"
          v-bind="layout"
        >
          <a-form-model-item label="群名称">
            <a-input
              v-model="createForm.groupName"
              placeholder="为你们的群取个给力的名字吧！"
            >
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="群简介">
            <a-input
              v-model="createForm.groupIntroduce"
              placeholder="简单介绍一下吧！"
            >
            </a-input>
          </a-form-model-item>
          <a-form-model-item :wrapperCol="{ span: 23 }" align="end">
            <a-button type="primary" html-type="submit"> 确认创建 </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('chat')
import { sendFriendApply, createGroup } from '@/axios/vChatApi'
import vchatHeader from '../components/vchatHeader.vue'
export default {
  name: 'chatFind',
  components: { vchatHeader },
  data() {
    return {
      searchForm: {
        username: '',
        type: 'friend', // 1找人，2:找群
      },
      askFormVisible: false,
      currentAddItem: {},
      askForm: {
        remark: '',
        groupId: '',
      },

      createFormVisible: false,
      createForm: {
        groupName: '',
        groupIntroduce: '',
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
      },
    }
  },
  computed: {
    ...mapState(['friends', 'groups', 'isChatFindOpen', 'searchResultList']),
  },
  methods: {
    ...mapActions(['closeChatFind', 'findLookFor', 'addGroup']),
    // 关闭主面板
    majorClose() {
      this.subCloseAsk()
      this.subCloseCreate()
      this.closeChatFind()
    },
    // 关闭次级面板
    subCloseAsk() {
      this.$refs.askForm && this.$refs.askForm.resetFields()
      this.askFormVisible = false
    },
    // 关闭次级面板
    subCloseCreate() {
      this.$refs.createForm && this.$refs.createForm.resetFields()
      this.createFormVisible = false
    },
    // 查找人/群
    search() {
      this.findLookFor({ ...this.searchForm })
    },
    // 添加人/群
    sendFriendApply() {
      const type = this.currentAddItem.type
      let params
      if (type) {
        // 群（群有type字段）
        params = {
          groupId: this.currentAddItem.id,
          adminGroup: this.currentAddItem.userId,
          remark: this.askForm.remark,
          msgTo: this.currentAddItem.userId,
          msgType: '2',
        }
      } else {
        // 人
        params = {
          ...this.askForm,
          msgTo: this.currentAddItem.id,
          msgType: '1',
        }
      }
      return sendFriendApply(params).then((res) => {
        if (res.success) {
          this.$message.success(res.message)
          this.subCloseAsk()
          return res
        } else {
          return Promise.reject(res)
        }
      })
    },
    // 打开添加人/群的请求面板
    openAdd(item) {
      if (!item.type && this.isFriend(item.id))
        return this.$message.warning(
          `${item.username}已是你的好友，不可重复添加`,
        )
      if (item.type && this.isInGroup(item.id))
        return this.$message.warning(`你已是[${item.groupName}]的群成员`)
      this.currentAddItem = item
      this.askFormVisible = true
      this.askForm.groupId = this.friends[0].id
    },
    // 是否是好友
    isFriend(id) {
      return this.friends.find((g) => g.list.find((friend) => friend.id === id))
    },
    // 是否在群中
    isInGroup(id) {
      return this.groups.find((group) => group.id === id)
    },
    // 打开创建群的面板
    openCreate() {
      this.createFormVisible = true
    },
    // 创建群
    createGroup() {
      createGroup({ ...this.createForm }).then((res) => {
        if (res.success) {
          this.$message.success(res.message)
          this.addGroup({ ...this.createForm, id: res.result, type: '2' })
          this.subCloseCreate()
        }
      })
    },
  },
}
</script>

<style lang="less">
.vchat-find {
  position: fixed;
  top: 100px;
  left: 100px;
  width: 1000px;
  // height: 600px;
  box-sizing: content-box;
  background-color: #fff;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid #d9d9d9;
  &-main {
    padding: 20px;
  }
  &-form {
    // text-align: center;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    height: 370px;
    overflow-y: auto;
    padding: 50px 0 20px;
  }
  &-item {
    display: flex;
    flex: none;
    width: 25%;
    height: 100px;
    // align-items: center;
    padding: 15px 20px 0;
  }
  &-avatar {
    flex: none;
    margin-top: 10px;
  }
  &-username {
    line-height: 20px;
    height: 20px;
    font-size: 14px;
  }
  &-sign {
    line-height: 18px;
    font-size: 12px;
    color: #999;
  }
  &-info {
    margin-left: 20px;
    // max-width: 90;
    overflow: hidden;
  }

  // 添加人或群的弹窗
  &-ask {
    position: fixed;
    top: 200px;
    left: 200px;
    background: #fff;
    border-radius: 3px;
    border: 1px solid #d9d9d9;
    &-avatar {
      &.ant-avatar {
        margin-right: 15px;
      }
    }
    &-item {
      display: flex;
      padding: 20px 20px 0;
    }
    &-form {
      margin-left: 20px;
      width: 240px;
    }
  }

  // 创建群的弹窗
  &-create {
    position: fixed;
    top: 200px;
    left: 200px;
    background: #fff;
    border-radius: 3px;
    border: 1px solid #d9d9d9;
    &-form {
      width: 600px;
      padding: 50px 0 20px;
    }
  }
}
</style>
