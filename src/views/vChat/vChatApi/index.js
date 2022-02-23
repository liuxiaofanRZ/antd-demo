import { axios } from '@/axios/service'

export const getList = (params) => axios.get('eoa/im/api/getList', { params })
