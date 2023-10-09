//1.判断token是否存在
//如果存在 正常渲染
//如果不存在 重新定向到登陆路由

//高阶组件：把一个组件当成另一个组件的参数传入
//通过一定的判断 返回新的组件
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'
function AuthComponent({ children }) {
  const isToken = getToken()
  if (isToken) {
    //有token 返回要渲染的组件
    return <>{children}</>
  } else {
    //没有token 重新定向跳转到登录
    return <Navigate to="/login" replace />
  }
}
export { AuthComponent }

//<AuthComponent><Layout></AuthComponent>
