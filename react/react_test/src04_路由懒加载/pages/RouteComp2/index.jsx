import React from 'react'
import {Route, Link} from 'react-router-dom'
import ChildRouteComp from './ChildRouteComp'

class RouteComp2 extends React.Component {

  render(){
    return (
      <div>
        <h2>RouteComp222</h2>
        <p>props count3={this.props.count3}</p>
        <hr/>
        <Link to="/rc2/crc">To ChildRouteComp</Link>

        <Route path="/rc2/crc" component={ChildRouteComp}></Route>
      </div>
    )
  }
}

export default RouteComp2