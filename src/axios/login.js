import { axios } from './service'

export const login = (params) => axios.post('sys/login', params)
