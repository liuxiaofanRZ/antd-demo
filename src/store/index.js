import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/axios/login'
import chat from './modules/chat'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    info: '',
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
  },
  actions: {
    Login({ commit }, userInfo) {
      return login(userInfo).then((response) => {
        if (response.code == '200') {
          const result = response.result
          commit('SET_INFO', result.userInfo)
          commit('SET_TOKEN', result.token)
          return response
        } else {
          return Promise.reject(response)
        }
      })
    },
  },
  modules: {
    chat,
  },
})
