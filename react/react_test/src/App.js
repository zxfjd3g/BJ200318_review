import React, {Component} from 'react'
import {
  Route, 
  Link, 
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom'

import RouteComp1 from './pages/RouteComp1'
import RouteComp2 from './pages/RouteComp2'
import './App.css'


class App extends Component {
  // 初始化状态
  state = {
    num: 2
  }

  render() {
    return (
      <div>
        <h2>App组件</h2>
        <NavLink to="/rc1">路由组件111</NavLink> &nbsp;&nbsp;&nbsp;
        <NavLink to="/rc2">路由组件222</NavLink>

        <hr/>
        <Switch>
          <Redirect from="/" to="/rc1" exact/>
          <Route path="/rc1" component={RouteComp1} exact></Route>
          <Route path="/rc2" component={RouteComp2}></Route>
          {/* 只要上面没有匹配, 直接匹配它 */}
          <Route render={()=> <h2>404</h2>}/>
        </Switch>

      </div>
    )
  }
}


export default App