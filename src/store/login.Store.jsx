//login module
import { makeAutoObservable } from 'mobx'
import { http, setToken, getToken, removeToken } from '@/utils'

class LoginStore {
  //初始化前本地取token
  token = getToken || ''
  constructor() {
    //respontive
    makeAutoObservable(this)
  }
  getToken = async ({ mobile, code }) => {
    //login interface
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code,
    })
    //存入token
    console.log(res.data)
    this.token = res.data.token
    //存入localStorage
    setToken(this.token)
  }
  clearToken = () => {
    this.token = ''
    removeToken()
  }
}
export default LoginStore
