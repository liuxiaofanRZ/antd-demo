import { getList } from '@/axios/vChatApi'
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
    SEND_MESSAGE({ sessions, currentSession }, message) {
      let session = sessions.find((item) => item.id === currentSession.id)

      // TODO: 消息的时间暂时使用本地的
      session.messages.push({
        ...message.mine,
        type: 'friend',
        timestamp: new Date().getTime(),
      })
    },
    // 接收消息
    RECEIVE_MESSAGE({ sessions }, mine /* 这里指发送消息的人 */) {
      let session = sessions.find((item) => item.id === mine.id)
      // TODO: 消息的时间暂时使用本地的
      session.messages.push({
        ...mine,
        mine: false,
        type: 'friend',
        timestamp: new Date().getTime(),
      })
    },
    CREATE_SESSION(state, to) {
      state.sessions.push({
        ...to,
        messages: [],
      })
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
  },
  actions: {
    initData: ({ commit }) => commit('INIT_DATA'),
    getInitChatInfo: ({ commit, rootState }) => {
      return getList({ userId: rootState.info.id }).then((res) => {
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
    receiveMessage: ({ commit, getters: { getTargetSession } }, { mine }) => {
      if (!getTargetSession(mine.id)) {
        commit('CREATE_SESSION', mine)
      }
      return commit('RECEIVE_MESSAGE', mine)
    },
    selectSession: ({ commit }, id) => commit('SELECT_SESSION', id),
    search: ({ commit }, value) => commit('SET_FILTER_KEY', value),
    openChatBox: ({ commit, state }, to) => {
      console.log(to)
      if (!state.sessions.find((item) => item.id === to.id)) {
        commit('CREATE_SESSION', to)
      }
      commit('OPEN_CHAT_BOX', true)
      commit('SELECT_SESSION', to)
    },
  },
}

export default chat
