<template>
  <div class="vchat-ads">
    <div class="vchat-ads-left">
      <div class="vchat-ads-search">
        <a-input
          ref="userNameInput"
          v-model="searchValue"
          placeholder="搜索"
          size="small"
          allow-clear
          class="vchat-ads-search-input"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
        <a-button
          class="vchat-ads-search-btn"
          size="small"
          icon="plus"
          @click="openChatFind"
        ></a-button>
      </div>
      <div class="vchat-ads-groups">
        <div class="vchat-ads-manage">
          <a-icon type="team"></a-icon
          ><span style="margin-left: 10px">通讯录管理</span>
        </div>
        <!-- 好友的分组 -->
        <div class="vchat-ads-group" v-for="(fg, fgi) in friends" :key="fg.id">
          <div
            class="vchat-ads-group-title vchat-ellipsis"
            @contextmenu.prevent="contextmenu(fg, fgi, 'friendGroup')"
          >
            {{ fg.groupname }}
          </div>
          <div
            class="vchat-ads-friend"
            @click="select(f)"
            v-for="(f, fi) in fg.list"
            :key="f.id"
            v-show="f.username.indexOf(searchValue) >= 0"
            @contextmenu.prevent="contextmenu(f, fi, 'friend')"
          >
            <a-avatar :size="36" :src="f.avatar" alt="头像" icon="user" />

            <div class="vchat-ads-friend-info">
              <div class="vchat-ads-friend-name vchat-ellipsis">
                {{ f.username }}
              </div>
              <div class="vchat-ads-friend-sign vchat-ellipsis">
                {{ f.sign }}
              </div>
            </div>
          </div>
        </div>
        <!-- 群 -->
        <div class="vchat-ads-group">
          <div class="vchat-ads-group-title vchat-ellipsis">群</div>
          <div
            class="vchat-ads-friend"
            @click="select(g)"
            v-for="(g, gi) in groups"
            :key="g.id"
            v-show="g.groupName.indexOf(searchValue) >= 0"
            @contextmenu.prevent="contextmenu(g, gi, 'group')"
          >
            <a-avatar :size="36" :src="g.avatar" alt="头像" icon="user" />

            <div class="vchat-ads-friend-info">
              <div class="vchat-ads-friend-name vchat-ellipsis">
                {{ g.groupName }}
              </div>
              <div class="vchat-ads-friend-sign vchat-ellipsis">
                {{ g.groupIntroduce }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vchat-ads-detail">
      <div class="vchat-ads-bar" v-vcdrag="'vchat_main_drag'"></div>
      <template v-if="curItem.id">
        <div class="vchat-ads-info" v-if="curItem.type">
          <div class="vchat-ads-item vchat-ads-title">
            <span class="vchat-ads-item-tit vchat-ellipsis">
              {{ curItem.groupName }}
            </span>
            <a-avatar
              style="border-radius: 0"
              shape="square"
              :size="60"
              :src="curItem.avatar"
              alt="头像"
              icon="user"
            />
          </div>
          <div class="vchat-ads-line"></div>
          <div class="vchat-ads-item">
            介绍：{{ curItem.groupIntroduce || '-' }}
          </div>
          <div class="vchat-ads-item">类型：群</div>
          <div class="vchat-ads-line"></div>
          <div class="vchat-ads-item" style="justify-content: center">
            <a-button type="primary" @click="openChatBox(curItem)"
              >发群消息</a-button
            >
          </div>
        </div>
        <div class="vchat-ads-info" v-else>
          <div
            style="align-items: flex-start; padding-bottom: 30px"
            class="vchat-ads-item"
          >
            <span class="vchat-ads-item-tit">
              {{ curItem.username }}
            </span>
            <a-avatar
              style="border-radius: 0"
              shape="square"
              :size="60"
              :src="curItem.avatar"
              alt="头像"
              icon="user"
            />
          </div>
          <div class="vchat-ads-line"></div>
          <div class="vchat-ads-item">签名：{{ curItem.sign || '-' }}</div>
          <div class="vchat-ads-item">类型：好友</div>
          <div class="vchat-ads-line"></div>
          <div class="vchat-ads-item" style="justify-content: center">
            <a-button type="primary" @click="openChatBox(curItem)"
              >发消息</a-button
            >
          </div>
        </div>
      </template>
    </div>
    <vchat-contextmenu :visible.sync="contextmenuVisible">
      <!-- TODO: 待完善 -->
      <div class="vchat-ads-ctx" v-if="curMenu === 'friend'">
        <div class="vchat-ads-ctx-item" @mousedown="openChatBox(curMenuItem)">
          发送消息
        </div>
        <div
          class="vchat-ads-ctx-item"
          @mousedown="openChatHistory(curMenuItem)"
        >
          聊天记录
        </div>
        <div
          class="vchat-ads-ctx-item"
          @mousedown="removeFriend(curMenuItem.id)"
        >
          删除好友
        </div>
      </div>
      <div class="vchat-ads-ctx" v-else-if="curMenu === 'friendGroup'">
        <!-- <div class="vchat-ads-ctx-item">同步好友</div> -->
        <div class="vchat-ads-ctx-item" @mousedown="createFgVisible = true">
          添加分组
        </div>
        <div class="vchat-ads-ctx-item" @mousedown="openFgEdit(curMenuItem)">
          重命名
        </div>
      </div>
      <div class="vchat-ads-ctx" v-else-if="curMenu === 'group'">
        <!-- <div class="vchat-ads-ctx-item">创建群</div> -->
        <div class="vchat-ads-ctx-item" @mousedown="openChatBox(curMenuItem)">
          发送群消息
        </div>
        <div
          class="vchat-ads-ctx-item"
          @mousedown="openChatHistory(curMenuItem)"
        >
          聊天记录
        </div>
        <div class="vchat-ads-ctx-item" @mousedown="leaveGroup(curMenuItem.id)">
          退出该群
        </div>
      </div>
    </vchat-contextmenu>

    <!-- 创建群 -->
    <div
      class="vchat-fg-modal"
      v-show="createFgVisible"
      id="vchat_fg_create_bar"
    >
      <vchat-header
        v-vcdrag="'vchat_fg_create_bar'"
        title="创建分组"
        @close="createFgVisible = false"
      />
      <div class="vchat-fg-modal-form">
        <div class="vchat-fg-modal-item">
          <a-input v-model="fgName"></a-input>
        </div>
        <div class="vchat-fg-modal-item">
          <a-button @click="createGroup">确定</a-button>
        </div>
      </div>
    </div>

    <!-- 创建群 -->
    <div class="vchat-fg-modal" v-show="editFgVisible" id="vchat_fg_edit_bar">
      <vchat-header
        v-vcdrag="'vchat_fg_edit_bar'"
        :title="'修改组名：' + curFg.groupname"
        @close="editFgVisible = false"
      />
      <div class="vchat-fg-modal-form">
        <div class="vchat-fg-modal-item">
          <a-input v-model="fgNameEdit"></a-input>
        </div>
        <div class="vchat-fg-modal-item">
          <a-button @click="editGroupName">确定</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('chat')
import vchatContextmenu from '../../components/vchatContextmenu.vue'
import { createGroup, editGroupName } from '@/axios/vChatApi'
import vchatHeader from '../../components/vchatHeader.vue'

export default {
  name: 'chatAddresslist',
  components: {
    vchatContextmenu,
    vchatHeader,
  },
  data() {
    return {
      curItem: {},
      searchValue: '',
      contextmenuVisible: false,
      curIndex: '',
      curMenu: 'friend',
      curMenuItem: {},

      // 创建朋友的分组
      createFgVisible: false,
      fgName: '',
      // 修改朋友组名
      editFgVisible: false,
      fgNameEdit: '',
      curFg: {},
    }
  },
  computed: {
    ...mapState(['friends', 'groups']),
  },

  methods: {
    ...mapActions([
      'openChatBox',
      'openChatFind',
      'openChatApply',
      'getInitChatInfo',
      'receiveMessage',
      'updateSign',
      'leaveGroup',
      'removeFriend',
      'openChatHistory',
      'getList',
    ]),
    select(item) {
      this.curItem = item
    },
    contextmenu(item, index, type) {
      this.curMenu = type
      this.curIndex = index
      this.curMenuItem = item
      this.contextmenuVisible = true
    },
    // 创建好友分组
    createGroup() {
      createGroup({ groupName: this.fgName, type: '0' }).then((res) => {
        if (res.success) {
          this.$message.success(res.message)
          this.getList()
          this.createFgVisible = false
          this.fgName = ''
        }
      })
    },
    openFgEdit(curMenuItem) {
      this.curFg = curMenuItem
      this.editFgVisible = true
    },
    // 编辑好友分组的组名
    editGroupName() {
      editGroupName({
        groupName: this.fgNameEdit,
        id: this.curFg.id,
        type: '0',
      }).then((res) => {
        if (res.success) {
          this.$message.success(res.message)
          this.getList()
          this.editFgVisible = false
          this.fgNameEdit = ''
        }
      })
    },
  },
}
</script>

<style lang="less">
.vchat-ads {
  display: flex;
  height: 100%;
  width: 100%;

  &-left {
    width: 250px;
    border-right: 1px solid #d9d9d9;

    flex: none;
    background-color: #eee;
  }
  &-right {
    width: calc(100% - 250px);
  }
  &-search {
    padding: 22px 12px 0;
    height: 59px;
    background-color: #f7f7f7;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    &-input {
      flex: 1;
    }
    &-btn {
      flex: none;
      margin-left: 5px;
    }
  }

  &-groups {
    height: calc(100% - 59px);
    padding: 15px 0;
    overflow-y: auto;
    color: #000;
  }
  &-manage {
    width: 225px;
    height: 40px;
    background-color: #fff;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ddd;
    cursor: pointer;
    font-size: 14px;
  }
  &-group {
    padding-top: 15px;
    border-bottom: 1px solid #ddd;
    min-height: 40px;
    &-title {
      padding-left: 15px;
      font-size: 12px;
      color: #999;
    }
  }
  &-friend {
    display: flex;
    padding-left: 15px;
    align-items: center;
    height: 60px;
    cursor: default;
    &:hover {
      background-color: #d8d8d8;
    }
    &-info {
      margin-left: 9px;
    }
    &-name {
      font-size: 14px;
      height: 19px;
    }
    &-sign {
      font-size: 12px;
      line-height: 18px;
      height: 18px;
      color: #999;
    }
  }

  // detail
  &-detail {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: #f5f5f5;
    position: relative;
  }
  &-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
  }
  &-info {
    padding-top: 100px;
    width: 70%;
  }
  &-item {
    display: flex;
    justify-content: space-between;
    min-height: 40px;
    align-items: center;
    font-size: 14px;
    .ant-avatar {
      flex: none;
    }
    &.vchat-ads-title {
      padding-bottom: 30px;
      align-items: flex-start;
    }
    &-tit {
      font-size: 18px;
      // max-width: 80%;
      margin-right: 20px;
    }
    &-label {
      color: #999;
    }
  }
  &-line {
    border-bottom: 1px solid #ddd;
    margin: 20px 0;
  }

  // 菜单
  // 菜单
  &-ctx {
    background-color: #fff;
    box-shadow: 2px 2px 10px #aaa;
    border-radius: 2px;
    overflow: hidden;
    font-size: 12px;
    line-height: 25px;
    &-item {
      padding: 0 25px;
      cursor: default;
      &:hover {
        background-color: #e2e2e2;
      }
    }
  }
  .vchat-fg-modal {
    position: fixed;
    top: 200px;
    left: 200px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 2px;
    &-form {
      padding: 30px 40px;
    }
    &-item {
      margin-bottom: 20px;
      text-align: right;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
