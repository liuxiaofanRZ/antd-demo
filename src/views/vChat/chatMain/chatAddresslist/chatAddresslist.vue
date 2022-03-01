<template>
  <div class="vchat-ads">
    <div class="vchat-ads-left">
      <div class="vchat-ads-search">search</div>
      <div class="vchat-ads-manage"></div>
      <div class="vchat-ads-groups">
        <!-- 好友的分组 -->
        <div class="vchat-ads-group" v-for="fgroup in friends" :key="fgroup.id">
          <div class="vchat-ads-group-title vchat-ellipsis">
            {{ fgroup.groupname }}
          </div>
          <div
            class="vchat-ads-friend"
            @click="select(f)"
            v-for="f in fgroup.list"
            :key="f.id"
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
            v-for="g in groups"
            :key="g.id"
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
              >发消息</a-button
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
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('chat')

export default {
  name: 'chatAddresslist',
  data() {
    return {
      curItem: {},
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
    ]),
    select(item) {
      this.curItem = item
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
    padding: 10px 12px 0;
    height: 59px;
    box-sizing: border-box;
    background-color: #fff;
  }

  &-groups {
    height: calc(100% - 59px);
    overflow-y: auto;
  }
  &-group {
    padding-top: 15px;
    border-bottom: 1px solid #ddd;
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
    cursor: pointer;
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
}
</style>
