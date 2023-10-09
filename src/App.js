import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { history } from './utils/history'
import Layout from './pages/Layout'
import Login from '@/pages/Login'
import { Button, Space } from 'antd'
import { AuthComponent } from './components/AuthComponent'
import './App.css'
import Publish from './pages/Publish'
import Article from './pages/Article'
import Home from './pages/Home'
function App () {
  return (
    //Configure the router here
    <HistoryRouter history={history}>
      <div className="App">

        <Routes>

          {/* Layout需要鉴权处理，根据是否登录了进行判断 */}

          <Route path='/' element={
            <AuthComponent>


              <Layout />
            </AuthComponent>

          }>
            <Route index element={<Home />}></Route>
            <Route path='article' element={<Article />}></Route>
            <Route path='publish' element={<Publish />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>

      </div>
    </HistoryRouter>

  )
}

export default App
