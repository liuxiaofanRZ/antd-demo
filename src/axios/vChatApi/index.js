import { axios } from '@/axios/service'
import store from '@/store'

export const getList = (params) =>
  axios.get('eoa/im/api/getList', {
    params: { ...params, token: store.state.token },
  })

export const queryMsgBoxCount = (params) =>
  axios.get('eoa/im/api/queryMsgBoxCount', {
    params: {
      ...params,
      token: store.state.token,
    },
  })
export const updateSign = (params) =>
  axios.put('eoa/im/api/updateSign', {
    ...params,
    token: store.state.token,
  })
