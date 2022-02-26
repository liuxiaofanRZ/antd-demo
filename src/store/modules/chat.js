import {
  getList,
  updateSign,
  recommendedFriends,
  findLookFor,
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
    // 当前选中的会话
    currentSession: {},
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
    // 新的请求数量
    newFindNum: 0,
    // // 申请加群的消息列表
    // applyGroupList: [],
    // // 申请加好友的消息列表
    // applyFriendList: []
  },
  getters: {
    getTargetSession:
      ({ sessions }) =>
      (id) => {
        return sessions.find((item) => item.id === id)
      },
  },
  mutations: {
    SET_MINE(state, mine) {
      state.mine = mine
    },
    SET_FRIENDS(state, friends) {
      state.friends = friends
    },
    SET_GROUPS(state, groups) {
      state.groups = groups
    },
    // 添加组
    ADD_GROUP(state, group) {
      state.groups.push(group)
    },
    // 发送消息
    SEND_MESSAGE({ sessions, currentSession }, data) {
      let session = sessions.find((item) => item.id === currentSession.id)
      session.messages.push({
        ...data.mine,
        type: 'friend',
        timestamp: new Date().getTime(),
      })
    },
    // TODO: 接收消息（只处理了会话消息）
    RECEIVE_MESSAGE({ sessions }, result) {
      const timestamp = new Date().getTime()
      let session = sessions.find((item) => item.id === result.data.mine.id)
      session.messages.push({
        ...result.data.mine,
        mine: false,
        type: 'friend',
        timestamp: result.data.to.sendTime
          ? result.data.to.sendTime
          : timestamp,
      })
    },
    // 创建会话
    CREATE_SESSION(state, to) {
      state.sessions.unshift({
        ...to,
        messages: [],
      })
    },
    // 创建会话列表
    INIT_SESSIONS(state, sessions) {
      state.sessions = sessions
    },
    // 选择会话
    SELECT_SESSION(state, to) {
      state.currentSession = to
    },
    // 搜索
    SET_FILTER_KEY(state, value) {
      state.filterKey = value
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
    // 更新查找结果
    UPDATE_SEARCH_RESULT(state, value) {
      state.searchResultList = value
    },
    // 更新签名
    UPDATE_SIGN(state, sign) {
      state.mine.sign = sign
    },
    // 更新请求（新的)数量
    UPDATE_NEW_FIND_NUM(state, num) {
      if (isNaN(num)) {
        state.newFindNum++
      } else {
        state.newFindNum = num
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
  },
  actions: {
    // 获取用户聊天模块的基本信息和历史会话数据
    getInitChatInfo: ({ commit, rootState }) => {
      // 从Storage中获取历史会话数据
      const historyChats =
        JSON.parse(localStorage.getItem('CHAT_HISTORY_CHATS')) || {}
      const sessions = historyChats[rootState.info.id] || []

      commit('INIT_SESSIONS', sessions)
      // 从后台获取基本信息
      return getList({ userId: rootState.info.id }).then((res) => {
        res.data.group.forEach((group) => {
          if (!group.groupName) group.groupName = '佚名'
        })
        commit('SET_MINE', res.data.mine)
        commit('SET_FRIENDS', res.data.friend)
        commit('SET_GROUPS', res.data.group)
        return res.data
      })
    },
    // TODO: 需要处理群聊天的情况
    sendMessage: ({ commit, state: { currentSession, mine } }, content) => {
      let data = {
        mine: {
          avatar: mine.avatar,
          content: content,
          id: mine.id,
          mine: true,
          username: mine.username,
        },
        to: {
          avatar: currentSession.avatar,
          id: currentSession.id,
          name: currentSession.groupname,
          sign: currentSession.sign,
          type: currentSession.type || 'friend',
          username: currentSession.username,
        },
      }
      App.chatWs.sendMsg({
        type: 'chatMessage', //随便定义，用于在服务端区分消息类型
        data,
      })

      return commit('SEND_MESSAGE', data)
    },
    // 处理会话消息
    receiveMessage: ({ commit, getters: { getTargetSession } }, result) => {
      // TODO: 还要处理不在当前会话弹窗的情况
      if (!getTargetSession(result.data.mine.id)) {
        commit(
          'CREATE_SESSION',
          result.data.mine /* 此处的mine是消息的发送者 */,
        )
      }
      return commit('RECEIVE_MESSAGE', result)
    },
    // 处理请求消息
    receiveFind: ({ commit }, msg) => {
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
      console.log(msg)
      commit('UPDATE_NEW_FIND_NUM')
    },
    selectSession: ({ commit }, id) => commit('SELECT_SESSION', id),
    search: ({ commit }, value) => commit('SET_FILTER_KEY', value),
    openChatBox: ({ commit, state }, to) => {
      if (!state.sessions.find((item) => item.id === to.id)) {
        commit('CREATE_SESSION', to)
      }
      commit('TOGGLE_CHAT_BOX', true)
      commit('SELECT_SESSION', to)
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
    // 添加组
    addGroup: ({ commit, state: { mine } }, groupInfo) => {
      if (!groupInfo.groupName) groupInfo.groupName = '佚名'
      commit('ADD_GROUP', { userId: mine.id, ...groupInfo })
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
