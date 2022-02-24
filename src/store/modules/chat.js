import { getList, updateSign } from '@/axios/vChatApi'
import App from '@/main'

const chat = {
  namespaced: true,
  state: {
    // 当前用户
    mine: {},
    groups: [],
    // 会话列表
    sessions: [],
    // 当前选中的会话
    currentSession: {},
    // 过滤出只包含这个key的会话
    filterKey: '',
    // 聊天窗是否显示
    isChatBoxOpen: false,
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
    SET_GROUPS(state, groups) {
      state.groups = groups
    },
    INIT_DATA(state) {
      let data = localStorage.getItem('vue-chat-session')
      if (data) {
        state.sessions = JSON.parse(data)
      }
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
      state.sessions.push({
        ...to,
        messages: [],
      })
    },
    // 创建会话列表
    CREATE_SESSIONS(state, sessions) {
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
    OPEN_CHAT_BOX(state, value) {
      state.isChatBoxOpen = value
    },
    // 更新签名
    UPDATE_SIGN(state, sign) {
      state.mine.sign = sign
    },
  },
  actions: {
    initData: ({ commit }) => commit('INIT_DATA'),
    // 获取用户聊天模块的基本信息和历史会话数据
    getInitChatInfo: ({ commit, rootState }) => {
      // 从后台获取基本信息
      return getList({ userId: rootState.info.id }).then((res) => {
        // 从Storage中获取历史会话数据
        const historyChats =
          JSON.parse(localStorage.getItem('CHAT_HISTORY_CHATS')) || {}
        const sessions = historyChats[rootState.info.id] || []

        commit('CREATE_SESSIONS', sessions)
        commit('SET_MINE', res.data.mine)
        commit('SET_GROUPS', res.data.friend)
        return res.data
      })
    },
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
    receiveMessage: ({ commit, getters: { getTargetSession } }, result) => {
      if (!getTargetSession(result.data.mine.id)) {
        commit(
          'CREATE_SESSION',
          result.data.mine /* 此处的mine是消息的发送者 */,
        )
      }
      return commit('RECEIVE_MESSAGE', result)
    },
    selectSession: ({ commit }, id) => commit('SELECT_SESSION', id),
    search: ({ commit }, value) => commit('SET_FILTER_KEY', value),
    openChatBox: ({ commit, state }, to) => {
      if (!state.sessions.find((item) => item.id === to.id)) {
        commit('CREATE_SESSION', to)
      }
      commit('OPEN_CHAT_BOX', true)
      commit('SELECT_SESSION', to)
    },
    updateSign: ({ commit, state: { mine } }, sign) => {
      return updateSign({ userId: mine.id, sign }).then(() => {
        commit('UPDATE_SIGN', sign)
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
  sessions.forEach(session=>{
    session.messages = session.messages.slice(-20)
    if(session.messages.length >=20) {
      session.hasMore = true
    }
  })
  historyChats[userId] = sessions
  // 保存sessions
  localStorage.setItem(
    'CHAT_HISTORY_CHATS',
    JSON.stringify(historyChats),
  )
})

export default chat
