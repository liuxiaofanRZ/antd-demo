<template>
  <div class="headline" id="vchatboxdragbar">
    <div class="title ellipsis">
      {{
        curSession.type == 'friend' ? curSession.username : curSession.groupName
      }}
    </div>
    <div v-if="curSession.type == 'group'" class="members">
      <span @click="show = !show" class="count">
        {{ count }}人
        <a-icon type="down" :rotate="show ? 180 : 0" />
      </span>
    </div>
    <vchat-headmenu></vchat-headmenu>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('chat')
import vchatHeadmenu from './headmenu'
import { getMembers } from '@/axios/vChatApi'
export default {
  name: 'headline',
  components: { vchatHeadmenu },
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
  created() {
    this.getMembers()
  },
  methods: {
    getMembers() {
      getMembers({ id: this.curSession.id }).then((res) => {
        if (res.data) {
          this.members = res.data.list
          this.count = res.data.number
          this.owner = res.data.owner
        }
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
  .title {
    margin-right: 10px;
  }
  .count {
    color: #888;
    cursor: pointer;
  }
}
</style>
