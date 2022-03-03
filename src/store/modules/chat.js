import {
  getList,
  updateSign,
  recommendedFriends,
  findLookFor,
  leaveGroup,
  removeFriend,
} from '@/axios/vChatApi'
import App from '@/main'

const chat = {
  namespaced: true,
  state: {
    // 当前用户
    mine: {},
    groups: [],
    friends: [],
    // 会话列表
    sessions: [],
    // 当前选中的会话。注：会话对象有三种，好友（无type字段），讨论组（type="1"），群（type="2"）
    curSession: {},
    // 过滤出只包含这个key的会话
    filterKey: '',
    // 聊天窗口是否显示
    isChatBoxOpen: false,
    // 查找窗口是否显示
    isChatFindOpen: false,
    // 消息盒子窗口是否显示
    isChatApplyOpen: false,
    // 查找结果
    searchResultList: [],
    // // 申请加群的消息列表
    // applyGroupList: [],
    // // 申请加好友的消息列表
    // applyFriendList: []

    // 显示聊天面板
    isChatOpen: false,
    // 当前模块 'sesssion','addresslist', 'apply'
    curModule: 'session',
    // 模块tab
    moduleTabs: {
      session: {
        title: '聊天',
        iconA: 'icon-wechat',
        iconB: 'icon-wechat2',
        id: 'session',
        newMsgCount: 0,
        dot: false,
      },
      addresslist: {
        title: '通讯录',
        iconA: 'icon-tongxunlu',
        iconB: 'icon-tongxunlu1',
        id: 'addresslist',
        newMsgCount: 0,
        dot: true,
      },
      apply: {
        title: '消息盒子',
        iconA: 'icon-tongzhi1',
        iconB: 'icon-tongzhigonggao',
        id: 'apply',
        newMsgCount: 0,
        dot: true,
      },
      applyBack: {
        title: '申请结果',
        iconA: 'icon-bello',
        iconB: 'icon-bell',
        id: 'applyBack',
        newMsgCount: 0,
        dot: false,
      },
    },
    // 当前聊天记录的相关信息
    curHistoryInfo: {
      id: '',
      type: '',
      name: '',
    },
    // 聊天记录窗口是否显示
    isChatHistoryOpen: false,
    // 回复的消息列表
    applyBacks: [],
    // 打开预览图片窗口
    isChatPicOpen: false,
    // 预览的图片src
    picSrc: '',
  },
  getters: {
    getTargetSession:
      ({ sessions }) =>
      (id) =>
        sessions.find((item) => item.id === id),
    getTargetGroup:
      ({ groups }) =>
      (id) =>
        groups.find((item) => item.id === id),
    newSessionCount: ({ sessions }) =>
      sessions.reduce((acc, cur) => acc + cur.newMsgCount, 0),
    newApplyBackCount: ({ applyBacks }) =>
      applyBacks.reduce((acc, cur) => acc + cur.isNew, 0),
  },
  mutations: {
    SET_MINE(state, mine) {
      state.mine = mine
    },
    SET_FRIENDS(state, friends) {
      state.friends = friends
    },
    REMOVE_FRIEND({ friends }, friendId) {
      for (let fgi in friends) {
        let fg = friends[fgi].list
        for (let fi in fg) {
          if (fg[fi].id === friendId) {
            fg.splice(fi, 1)
            return
          }
        }
      }
    },
    SET_GROUPS(state, groups) {
      state.groups = groups
    },
    // 删除群
    REMOVE_GROUP(state, groupId) {
      let index = state.groups.findIndex((g) => g.id === groupId)
      state.groups.splice(index, 1)
    },
    // 添加群
    ADD_GROUP(state, group) {
      state.groups.push(group)
    },
    // 添加回复的消息
    ADD_APPLY_BACK(state, applyBack) {
      state.applyBacks.unshift(applyBack)
    },
    // 设置收到的回复消息为已读
    SET_APPLYBACK_READ(state, index) {
      if (isNaN(index)) {
        state.applyBacks.forEach((item) => {
          item.isNew = 0
        })
      } else {
        state.applyBacks[index].isNew = 0
      }
    },
    // 发送消息
    SEND_MESSAGE({ sessions, curSession }, data) {
      let session = sessions.find((item) => item.id === curSession.id)
      session.messages.push({
        ...data.mine,
        type: 'friend',
        timestamp: new Date().getTime(),
      })
    },
    // 接收好友消息
    RECEIVE_MESSAGE_FRIEND(
      { sessions, curSession, curModule, isChatOpen },
      data,
    ) {
      const timestamp = new Date().getTime()
      let session = sessions.find((item) => item.id === data.mine.id)
      // 当前会话处于后台的时候
      if (
        !(isChatOpen && curModule === 'session' && curSession.id === session.id)
      ) {
        session.newMsgCount++
      }
      session.messages.push({
        ...data.mine,
        mine: false,
        type: data.to.type,
        timestamp: data.to.sendTime ? data.to.sendTime : timestamp,
      })
    },
    // 接收群消息消息
    RECEIVE_MESSAGE_GROUP(
      { sessions, curSession, curModule, isChatOpen },
      data,
    ) {
      const timestamp = new Date().getTime()
      let session = sessions.find((item) => item.id === data.to.id)
      // 当前会话处于后台的时候
      if (
        !(isChatOpen && curModule === 'session' && curSession.id === session.id)
      ) {
        session.newMsgCount++
      }
      session.messages.push({
        ...data.to,
        ...data.mine,
        groupId: data.to.id,
        mine: false,
        type: data.to.type,
        timestamp: data.to.sendTime ? data.to.sendTime : timestamp,
      })
    },
    // 创建会话
    CREATE_SESSION(state, to) {
      state.sessions.unshift({
        ...to,
        messages: [],
        newMsgCount: 0,
      })
    },
    // 删除会话
    REMOVE_SESSION(state, id) {
      let index = state.sessions.findIndex((s) => s.id === id)
      if (state.sessions[index].id === state.curSession.id) {
        state.curSession = {}
      }
      state.sessions.splice(index, 1)
    },
    // 创建会话列表
    SET_SESSIONS(state, sessions) {
      state.sessions = sessions
    },
    // 设置当前会话
    SET_CURRENT_SESSION(state, session) {
      session.newMsgCount = 0
      state.curSession = session
    },
    // 搜索
    SET_FILTER_KEY(state, value) {
      state.filterKey = value
    },
    // 打开大图预览窗口
    TOGGLE_CHAT_PIC(state, src) {
      if (src) {
        state.picSrc = src
        state.isChatPicOpen = true
      } else {
        state.picSrc = ''
        state.isChatPicOpen = false
      }
    },
    // 打开聊天窗口
    TOGGLE_CHAT_BOX(state, value) {
      state.isChatBoxOpen = value
    },
    // 打开查找窗口
    TOGGLE_CHAT_FIND(state, value) {
      state.isChatFindOpen = value
    },
    // 打开消息盒子窗口
    TOGGLE_CHAT_APPLY(state, value) {
      state.isChatApplyOpen = value
    },
    TOGGLE_HISTORY_APPLY(state, { value, info }) {
      state.curHistoryInfo = value
        ? {
            id: info.id,
            type: info.type ? 'group' : 'friend',
            name: info.type ? info.groupName : info.username,
          }
        : {}
      state.isChatHistoryOpen = value
    },
    // 更新查找结果
    UPDATE_SEARCH_RESULT(state, value) {
      state.searchResultList = value
    },
    // 更新签名
    UPDATE_SIGN(state, sign) {
      state.mine.sign = sign
    },
    // 更新请求（新的)数量
    UPDATE_NEW_FIND_NUM({ moduleTabs }, num) {
      if (isNaN(num)) {
        moduleTabs['apply'].newMsgCount++
      } else {
        moduleTabs['apply'].newMsgCount = num
      }
    },
    // // 更新申请加群的消息列表
    // UPDATE_APPLY_GROUP_LIST(state, list) {
    //   state.applyGroupList = list
    // },
    // // 更新申请加好的的消息列表
    // UPDATE_APPLY_FRIEDN_LIST(state, list) {
    //   state.applyFriendList = list
    // },

    // 打开聊天面板
    TOGGLE_CHAT(state, value) {
      state.isChatOpen = typeof value != 'boolean' ? !state.isChatOpen : value
    },
    // 设置当前模块
    SET_MODULE(state, value) {
      if (value === 'session') {
        state.curSession.newMsgCount = 0
      }
      state.curModule = value
    },
  },
  actions: {
    // 获取基本信息
    async getList({ commit }) {
      let res = await getList()
      res.data.group.forEach((group) => {
        if (!group.groupName) group.groupName = '佚名'
      })
      commit('SET_MINE', res.data.mine)
      commit('SET_FRIENDS', res.data.friend)
      commit('SET_GROUPS', res.data.group)
      return res
    },
    // 获取用户聊天模块的基本信息和历史会话数据
    async getInitChatInfo({ commit, rootState, dispatch }) {
      // 从Storage中获取历史会话数据
      const historyChats =
        JSON.parse(localStorage.getItem('CHAT_HISTORY_CHATS')) || {}
      const sessions = historyChats[rootState.info.id] || []

      commit('SET_SESSIONS', sessions)
      // 从后台获取基本信息
      return dispatch('getList')
    },
    // 发送聊天消息
    sendMessage: ({ commit, state: { curSession, mine } }, content) => {
      let data = {
        mine: {
          avatar: mine.avatar,
          content: content,
          id: mine.id,
          mine: true,
          username: mine.username,
        },
        to: {
          avatar: curSession.avatar,
          id: curSession.id,
          name: curSession.groupname,
          sign: curSession.sign,
          type: curSession.type ? 'group' : 'friend',
          username: curSession.username,
        },
      }
      App.chatWs.sendMsg({
        type: 'chatMessage', //随便定义，用于在服务端区分消息类型
        data,
      })

      return commit('SEND_MESSAGE', data)
    },
    // 发送回复他人申请的信息
    sendApplyMsg(state, to) {
      let data = {
        to,
      }
      App.chatWs.sendMsg({
        type: 'msgbox',
        data,
      })
    },
    // 发送申请消息
    sendFindMsg(state, to) {
      let data = { to }
      App.chatWs.sendMsg({
        type: 'find',
        data,
      })
    },
    // 处理会话消息
    receiveMessage: (
      { commit, getters: { getTargetSession, getTargetGroup } },
      data,
    ) => {
      // TODO: 还要处理不在当前会话弹窗的情况
      if (data.to.type === 'friend') {
        if (!getTargetSession(data.mine.id)) {
          commit('CREATE_SESSION', data.mine /* mine是消息的发送者 */)
        }
        commit('RECEIVE_MESSAGE_FRIEND', data)
      } else if (data.to.type === 'group') {
        let group = getTargetGroup(data.to.id)
        if (!group) return console.log('不在该群：' + data.to.id)
        if (!getTargetSession(data.to.id)) {
          commit(
            'CREATE_SESSION',
            { ...group, ...data.to } /* to是会话所在的群 */,
          )
        }
        commit('RECEIVE_MESSAGE_GROUP', data)
      }
    },
    // 处理请求消息
    receiveFindAsk: ({ commit }, data) => {
      // msg = {
      //   "type": "find",
      //   "data": {
      //     "to": {
      //       "id": "baed4cbc85c845bf8b795ca3f3a93220",
      //       "system": true,
      //       "type": "group",
      //       "content": "王建国申请加入群"
      //     }
      //   }
      // }
      console.log(data)
      commit('UPDATE_NEW_FIND_NUM')
    },
    // 处理回复消息
    receiveApplyBack: ({ commit, dispatch }, { to }) => {
      to.isNew = 1
      commit('ADD_APPLY_BACK', to)

      if (!to.agree) return
      dispatch('getList')
    },
    // 将收到的回复消息设为已读
    applybackRead({ commit }, index) {
      commit('SET_APPLYBACK_READ', index)
    },
    search: ({ commit }, value) => commit('SET_FILTER_KEY', value),
    openChatBox: ({ commit, state: { sessions, mine } }, session) => {
      if (session.id === mine.id) return
      if (!sessions.find((item) => item.id === session.id)) {
        commit('CREATE_SESSION', session)
      }
      commit('TOGGLE_CHAT_BOX', true)
      commit('SET_CURRENT_SESSION', session)
      commit('SET_MODULE', 'session')
    },
    closeChatBox: ({ commit }) => {
      commit('TOGGLE_CHAT_BOX', false)
    },
    openChatFind: ({ commit, state: { mine } }) => {
      commit('TOGGLE_CHAT_FIND', true)
      return recommendedFriends({
        userId: mine.id,
        type: 'get',
      }).then((res) => {
        if (res.success) {
          commit('UPDATE_SEARCH_RESULT', res.result)
          return res
        } else {
          return Promise.reject(res)
        }
      })
    },
    closeChatFind: ({ commit }) => {
      commit('TOGGLE_CHAT_FIND', false)
    },
    openChatApply: ({ commit }) => {
      commit('TOGGLE_CHAT_APPLY', true)
    },
    closeChatApply: ({ commit }) => {
      commit('TOGGLE_CHAT_APPLY', false)
    },
    openChatHistory: ({ commit }, info) => {
      commit('TOGGLE_HISTORY_APPLY', { value: true, info })
    },
    closeChatHistory: ({ commit }) => {
      commit('TOGGLE_HISTORY_APPLY', { value: false })
    },
    updateSign: ({ commit, state: { mine } }, sign) => {
      return updateSign({ userId: mine.id, sign }).then((res) => {
        commit('UPDATE_SIGN', sign)
        return res
      })
    },
    findLookFor: ({ commit }, params) => {
      return findLookFor(params).then((res) => {
        if (res.success) {
          commit('UPDATE_SEARCH_RESULT', res.result)
          return res
        } else {
          return Promise.reject(res)
        }
      })
    },
    // 添加群
    addGroup: ({ commit, state: { mine } }, groupInfo) => {
      if (!groupInfo.groupName) groupInfo.groupName = '佚名'
      commit('ADD_GROUP', { userId: mine.id, ...groupInfo })
    },
    // 打开聊天面板
    showChat({ commit }, value) {
      commit('TOGGLE_CHAT', value)
    },
    // 设置当前模块
    setModule({ commit }, value) {
      if (value == 'apply') {
        commit('UPDATE_NEW_FIND_NUM', 0)
      }
      commit('SET_MODULE', value)
    },
    // 删除会话，参数是session的id，不传则删除所有会话
    removeSession({ commit }, id) {
      if (id) {
        commit('REMOVE_SESSION', id)
      } else {
        commit('SET_SESSIONS', [])
        commit('SET_CURRENT_SESSION', {})
      }
    },
    // 退出群
    leaveGroup({ commit }, groupId) {
      return leaveGroup({ groupId }).then((res) => {
        if (res.success) {
          commit('REMOVE_GROUP', groupId)
          return res
        } else {
          return Promise.reject(res)
        }
      })
    },
    // 删除好友
    removeFriend({ commit }, friendId) {
      removeFriend({ friendId }).then((res) => {
        if (res.success) {
          commit('REMOVE_FRIEND', friendId)
          return res
        } else {
          return Promise.reject(res)
        }
      })
    },
  },
}

// 保存聊天数据
window.addEventListener('unload', function () {
  let userId = chat.state.mine.id
  // 未登录过
  if (!userId) return
  /**
   * 获取storage中的historyChats
   * historyChats是map格式的，key是登陆过的用户的id，value是该用户的所有会话：
   * {[userId]:sessions}
   */
  const historyChats =
    JSON.parse(localStorage.getItem('CHAT_HISTORY_CHATS')) || {}
  // 本地只缓存每个会话最新的20条数据
  let sessions = JSON.parse(JSON.stringify(chat.state.sessions))
  sessions.forEach((session) => {
    session.messages = session.messages.slice(-20)
    if (session.messages.length >= 20) {
      session.hasMore = true
    }
  })
  historyChats[userId] = sessions
  // 保存sessions
  localStorage.setItem('CHAT_HISTORY_CHATS', JSON.stringify(historyChats))
})

export default chat
