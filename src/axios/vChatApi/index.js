import { axios } from '@/axios/service'
import store from '@/store'

export const getList = (params) =>
  axios.get('eoa/im/api/getList', {
    params: { ...params, token: store.state.token },
  })

export const queryMsgBoxCount = (params = {}) =>
  axios.get('eoa/im/api/queryMsgBoxCount', {
    params: {
      ...params,
      id: store.state.info.id,
      token: store.state.token,
    },
  })
export const updateSign = (params) =>
  axios.put('eoa/im/api/updateSign', {
    ...params,
    token: store.state.token,
  })

export const recommendedFriends = (params) =>
  axios.get('eoa/im/api/recommendedFriends', {
    params: { ...params, token: store.state.token },
  })

export const findLookFor = (params) =>
  axios.get('eoa/im/api/findLookFor', {
    params: {
      ...params,
      userId: store.state.info.id,
      token: store.state.token,
    },
  })
export const sendFriendApply = (params) =>
  axios.get('eoa/im/api/sendFriendApply', {
    params: {
      ...params,
      msgForm: store.state.info.id,
      token: store.state.token,
    },
  })
export const createGroup = (params) =>
  axios.get('eoa/im/api/createGroup', {
    params: {
      ...params,
      type: '2',
      userId: store.state.info.id,
      token: store.state.token,
    },
  })

export const queryCharMsgList = (params) =>
  axios.get('eoa/im/api/queryCharMsgList', {
    params: {
      ...params,
      userId: store.state.info.id,
      token: store.state.token,
    },
  })

export const unAgreeFriend = (params) =>
  axios.get('eoa/im/api/unAgreeFriend', {
    params: {
      ...params,
      token: store.state.token,
    },
  })

export const agreeGroup = (params) =>
  axios.get('eoa/im/api/agreeGroup', {
    params: {
      ...params,
      token: store.state.token,
    },
  })

export const agreeFriend = (params) =>
  axios.get('eoa/im/api/agreeFriend', {
    params: {
      ...params,
      token: store.state.token,
    },
  })
