<template>
  <div class="headline">
    <div class="title vchat-ellipsis">
      {{ curSession.type ? curSession.groupName : curSession.username }}
    </div>
    <!-- @blur="show = false" -->
    <div
      v-if="curSession.type"
      @blur="show = false"
      class="members"
      tabindex="-1"
    >
      <span class="count" @click="show = !show">
        {{ count }}人
        <a-icon type="down" :rotate="show ? 180 : 0" />
      </span>
      <div class="member-box" v-show="show">
        <div
          :title="item.username"
          class="member-item"
          v-for="item in members"
          :key="item.id"
          @click="chatTo(item)"
        >
          <a-avatar
            class="avatar"
            :alt="item.username"
            :src="item.avatar"
            icon="user"
            size="large"
          />
          <div class="name vchat-ellipsis">{{ item.username }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('chat')
import { getMembers } from '@/axios/vChatApi'
export default {
  name: 'headline',
  data() {
    return {
      members: [],
      count: '-',
      owner: {},
      show: false,
    }
  },
  computed: {
    ...mapState(['curSession']),
  },
  watch: {
    curSession(s, o) {
      if (s.type && s.id !== o.id) {
        this.getMembers()
      }
    },
  },
  created() {
    this.getMembers()
  },
  methods: {
    ...mapActions(['openChatBox']),
    getMembers() {
      if (!this.curSession.id) return
      getMembers({ id: this.curSession.id }).then((res) => {
        if (res.data) {
          this.members = res.data.list
          this.count = res.data.number
          this.owner = res.data.owner
        }
      })
    },
    chatTo(item) {
      this.openChatBox({
        id: item.id,
        username: item.username,
        avatar: item.avatar,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.headline {
  height: 60px;
  line-height: 60px;
  padding-left: 30px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  position: relative;
  cursor: default;
  .title {
    margin-right: 10px;
  }
  .count {
    color: #888;
    cursor: pointer;
  }
  .members {
    cursor: default;
  }
  .member-box {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: 240px;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 10;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    flex-wrap: wrap;
    padding: 0 35px 10px;
    overflow-y: auto;
  }
  .member-item {
    width: 80px;
    height: 100px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    line-height: 30px;
    cursor: pointer;
    margin: 10px 10px 0;
    &:hover {
      opacity: 0.7;
    }
    .name {
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>
