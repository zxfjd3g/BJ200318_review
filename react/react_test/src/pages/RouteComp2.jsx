import React from 'react'
import {
  Route, 
  Link, 
} from 'react-router-dom'
import ChildRouteComp from './ChildRouteComp'

export default function RouteComp2() {
  return (
    <div>
      <h3>RouteComp222</h3>

      <Link to="/rc2/child">子路由</Link>

      <hr/>

      <Route path="/rc2/child" component={ChildRouteComp}></Route>
    </div>
  )
}
