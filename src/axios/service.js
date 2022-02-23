import axios from 'axios'
import { BASE_URL } from '@/util/env'
import store from '@/store'

let apiBaseUrl = BASE_URL

const service = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
})

service.interceptors.request.use((config) => {
  let token = store.state.token
  if (token) {
    config.headers['X-Access-Token'] = token
  }

  if (config.method == 'get') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params,
    }
  }
  return config
})

service.interceptors.response.use((response) => {
  return response.data
})

export { service as axios }
