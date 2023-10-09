//封装axios
//实例化 请求拦截器 响应拦截器
import axios from 'axios'
import { getToken } from './token'
import { history } from './history'
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})
//添加请求拦截器
http.interceptors.request.use(
  (config) => {
    //if not login,add token
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//添加响应拦截器
http.interceptors.response.use(
  (response) => {
    //2XX 范围内的状态码都会触发该函数，对响应数据做出动作
    return response.data
  },
  (error) => {
    if (error.response.status === 401) {
      console.log('login')
      history.push('/login')
    }
    return Promise.reject(error)
  }
)
export { http }
