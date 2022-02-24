import axios from 'axios'
import { BASE_URL } from '@/util/env'
import store from '@/store'
import qs from "qs"

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
  // chat相关的请求是formdata类型
  if (config.url.indexOf('eoa/im') >= 0) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.data = qs.stringify(config.data)
  }

  return config
})

service.interceptors.response.use((response) => {
  return response.data
})

export { service as axios }
